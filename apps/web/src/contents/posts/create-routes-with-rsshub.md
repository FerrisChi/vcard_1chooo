---
title: "Create routes with RSSHub"
category: "Home Lab"
startDate: 2025-02-14
endDate: 2025-02-14
publishedAt: 2025-02-14
summary: "🔧 A hands on experience to create a routes on your own with RSSHub."
tags:
  - Open source
banner: /images/banner/posts/create-routes-with-rsshub.webp
alt: "CampusCompanion"
---

# Create routes with RSSHub

No Routes found? Here is an example how to create a new router for updates on [bluesky](https://bsky.app/) user generated feeds like [Cat Pics](https://bsky.app/profile/jaz.bsky.social/feed/cv:cat).
![Cat Pics feed](/images/posts/create-routes-with-rsshub/cat_pics.png)

## Preparation
1. Read [Develop Guide](https://docs.rsshub.app/joinus/new-rss/before-start) and build the environment.
3. Create a `namespace.ts` in `lib/routes/bsky`. Since `bsky` has some routes already, we only create a new file `feeds.ts`.

## Start Coding
1. Complete the `Route` which is exported at `feeds.ts`, where we define `path`, `example`, `parameters` and specify the `maintainers`.
   
    ```typescript
    export const route: Route = {
        path: '/profile/:handle/feed/:space/:routeParams?',
        categories: ['social-media', 'popular'],
        view: ViewType.SocialMedia,
        example: '/bsky.app/profile/jaz.bsky.social/feed/cv:cat',
        parameters: {
            handle: 'User handle, can be found in URL',
            space: 'Space ID, can be found in URL',
        },
        features: {
            requireConfig: false,
            requirePuppeteer: false,
            antiCrawler: false,
            supportBT: false,
            supportPodcast: false,
            supportScihub: false,
        },
        name: 'Feeds',
        maintainers: ['FerrisChi'],
        handler,
    };
    ```
2. Define `handler` function, which is the main function to process the query, fetch information from bluesky and aggreate into pieces of feeds.

    ```typescript
    async function handler(ctx) {
        const handle = ctx.req.param('handle');
        const space = ctx.req.param('space');

        const DID = await resolveHandle(handle, cache.tryGet);
        const uri = `at://${DID}/app.bsky.feed.generator/${space}`;
        const profile = await getFeedGenerator(uri, cache.tryGet);
        const feeds = await getFeed(uri, cache.tryGet);

        const items = feeds.feed.map(({ post }) => ({
            title: post.record.text.split('\n')[0],
            description: art(path.join(__dirname, 'templates/post.art'), {
                text: post.record.text.replaceAll('\n', '<br>'),
                embed: post.embed,
            }),
            author: post.author.displayName,
            pubDate: parseDate(post.record.createdAt),
            link: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('app.bsky.feed.post/')[1]}`,
            upvotes: post.likeCount,
            comments: post.replyCount,
        }));

        // set data in ctx let middleware log in debug mode
        ctx.set('json', {
            DID,
            profile,
            feeds,
        });

        return {
            title: `${profile.view.displayName} — Bluesky`,
            description: profile.view.description?.replaceAll('\n', ' '),
            link: `https://bsky.app/profile/${handle}/feed/${space}`,
            image: profile.view.avatar,
            icon: profile.view.avatar,
            logo: profile.view.avatar,
            item: items,
            allowEmpty: true,
        };
    }
    ```
3. We use utils functions to access AT protocol APIs supported by Bluesky, and use [`tryGet(key, getValueFunc)`](https://docs.rsshub.app/joinus/advanced/use-cache#cache-tryget-key-getvaluefunc-maxage-refresh) to try get the `key` in Cache. If cache missed, it executes the `getValueFunc` to get and store the value.
   ```typescript
   // https://github.com/bluesky-social/atproto/blob/main/lexicons/app/bsky/feed/getFeed.json
    const getFeed = (uri, tryGet) =>
        tryGet(
            `bsky:feed:${uri}`,
            async () => {
                const { data } = await got('https://public.api.bsky.app/xrpc/app.bsky.feed.getFeed', {
                    searchParams: {
                        feed: uri,
                        limit: 30,
                    },
                });
                return data;
            },
            config.cache.routeExpire,
            false
        );

    // https://github.com/bluesky-social/atproto/blob/main/lexicons/app/bsky/feed/getFeedGenerator.json
    const getFeedGenerator = (uri, tryGet) =>
        tryGet(
            `bsky:feedGenerator:${uri}`,
            async () => {
                const { data } = await got('https://public.api.bsky.app/xrpc/app.bsky.feed.getFeedGenerator', {
                    searchParams: {
                        feed: uri,
                    },
                });
                return data;
            },
            config.cache.routeExpire,
            false
        );   
   ```


## Test
After deployed, test this routes in localhost.
   ![Cat feed rss](/images/posts/create-routes-with-rsshub/cat_rss.png)

See detail implemention in https://github.com/FerrisChi/RSSHub/tree/master.