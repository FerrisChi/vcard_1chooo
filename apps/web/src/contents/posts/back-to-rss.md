---
title: "Back to RSS: Self-host RSS server with FreshRSS and RSSHub"
category: "Home Lab"
startDate: 2025-01-29
endDate: 2025-01-29
publishedAt: 2025-01-29
summary: "🔍 Deploy and configure self-hosted RSS services on Linux."
tags:
  - Open source
banner: /images/banner/posts/back-to-rss.webp
alt: "BackToRSS"
---

# Back to RSS: Self-host RSS server with FreshRSS and RSSHub

Social media giants like Meta, X, Redbook, Sina, and Wechat are locking users in their own websites, making the world smaller and smaller, especially mobile websites. And I always find myself using only 3-4 apps in everyday routine. On one hand, I feel like to be struck in the same type of information more and more by recommendation algorithm, losing the initiative of retrieving information. Great content creater, however, doesn't exist in the same website for different reasons. RSS is a way to integrate information from differnet websites and provide a uniform platform to go through all the customized information a person can get in an old-school way.

I've heard about the story of Google Reader, a RSS reader built by Google and gather information from websites. I'm wondering the passion that website creaters share their knowledge with the whole world and the open source spirit that lies in the blood of that era. Nowadays, Google Reader no longer exists, but RSS is also a good way to collect first-hand information directly from publishers.

This blog focus on deploying `FreshRSS` on Linux server as a RSS feed aggragater and get RSS subscriptions using `RSSHub`, along with other RSS resources I subscribed. For the simplicity, I install these services with docker compose on a Linux VPS.

## FreshRSS
[FreshRSS](https://github.com/FreshRSS/FreshRSS) is a self-hosted RSS feed aggregator. There's a comparision between [FreshRSS and TinyTinyRSS(TT-RSS)](https://www.reddit.com/r/selfhosted/comments/v3xtz7/tinytinyrss_vs_freshrss/) and I personally chose FreshRSS because it's really easy to setup, and accessible to popular feed readers on my mobile and desktop.

### Deployment

Create the folder:
```bash
mkdir freshrss
cd freshrss
```
In `docker-compose.yml`:
```yml
volumes:
  data:
  extensions:

services:
  freshrss:
    image: freshrss/freshrss:latest
    container_name: freshrss
    hostname: freshrss
    restart: unless-stopped
    logging:
      options:
        max-size: 10m
    volumes:
      - data:/var/www/FreshRSS/data
      - extensions:/var/www/FreshRSS/extensions
    ports:
      - "${PUBLISHED_PORT}:80"
    environment:
      TZ: America/Toronto
      CRON_MIN: '3,33'
      FRESHRSS_ENV: production
      TRUSTED_PROXY: 172.16.0.1/12 192.168.0.1/16
```
`FreshRSS` has a built-in SQLite database, but other databases are also supported. To include a `PostgreSQL`, in `docker-compose-db.yml`:
```yml
volumes:
  db:

services:
  freshrss-db:
    image: postgres:17
    container_name: freshrss-db
    hostname: freshrss-db
    restart: unless-stopped
    logging:
      options:
        max-size: 10m
    volumes:
      - db:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${DB_BASE:-freshrss}
      POSTGRES_USER: ${DB_USER:-freshrss}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-freshrss}
    command:
      # Examples of PostgreSQL tuning.
      # https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server
      # When in doubt, skip and stick to default PostgreSQL settings.
      - -c
      - shared_buffers=1GB
      - -c
      - work_mem=32MB
```

And we define environment variables in `.env`:
```bash
# Domain (DNS) or sub-domain, e.g. `freshrss.1ferris.xyz` 
SERVER_DNS=SERVER_DOMAIN_NAME

ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=YOUR_PASSWORD
ADMIN_API_PASSWORD=YOUR_API_PASSWORD
# Published port if running locally
PUBLISHED_PORT=8081
# Database credentials (not relevant if using default SQLite database)
DB_HOST=freshrss-db
DB_BASE=freshrss
DB_PASSWORD=freshrss
DB_USER=freshrss
```

Run `FreshRSS`:
```bash
cd freshrss/
# Update
docker compose pull
# Run
docker compose up -d --remove-orphans
# Logs
docker compose logs -f --timestamps
# Stop
docker compose down --remove-orphans
```

You can find the document for Docker Compose [here](https://github.com/FreshRSS/FreshRSS/tree/edge/Docker#docker-compose). And if you have subscriptions created before, it supports import file in OPML format.

### Configuration

1. Use a reverse proxy to expose `FreshRSS` to external services, and create a valid `SSL` certificate to secure it.

2. To support GReader and Fever APIs, go to `Settings` - `Authentication` and enable `Allow API access`.
![authentication](/images/posts/back-to-rss/authentication.png)

3. Access `https://SERVER_DOMAIN_NAME` to check if it passes the api check.
![Api test](/images/posts/back-to-rss/api_test.png)


## RssHub

> 🧡 Everything is RSSible

RSSHub is an open-source project that serves as a feed generator. There's a lot of [public RSSHub instances](https://docs.rsshub.app/guide/instances) ready for use and you can access them without the need for deploy by yourself.

### Deployment

Create the folder:
```bash
mkdir rsshub
cd rsshub
```

A sample `docker-compose.yml` file:
```yml
services:
    rsshub:
        # two ways to enable puppeteer:
        # * comment out marked lines, then use this image instead: diygod/rsshub:chromium-bundled
        # * (consumes more disk space and memory) leave everything unchanged
        image: diygod/rsshub
        restart: always
        container_name: rsshub-app
        ports:
            - '1200:1200'
        environment:
            NODE_ENV: production
            # cache
            CACHE_TYPE: redis
            REDIS_URL: 'redis://redis:6379/'
            PUPPETEER_WS_ENDPOINT: 'ws://browserless:3000'
            PROXY_URI: "socks5h://warp-socks:9091"
            # add other environment variables below
            YOUTUBE_KEY: ${YOUTUBE_KEY}
            YOUTUBE_CLIENT_ID: ${YOUTUBE_CLIENT_ID}
            YOUTUBE_CLIENT_SECRET: ${YOUTUBE_CLIENT_SECRET}
            YOUTUBE_REFRESH_TOKEN: ${YOUTUBE_REFRESH_TOKEN}
        depends_on:
            - redis
            - browserless

    browserless:
        image: browserless/chrome
        restart: always
        ulimits:
          core:
            hard: 0
            soft: 0

    redis:
        image: redis:alpine
        restart: always
        container_name: rsshub-redis
        volumes:
            - redis-data:/data

    warp-socks:
        image: monius/docker-warp-socks:latest
        container_name: rsshub-warp
        privileged: true
        ports:
            - "172.17.0.1:9091:9091"
            - "127.0.0.1:9091:9091" #solve problem 1
        volumes:
            - /lib/modules:/lib/modules
        cap_add:
            - NET_ADMIN
            - SYS_ADMIN
        sysctls:
            net.ipv6.conf.all.disable_ipv6: 0
            net.ipv4.conf.all.src_valid_mark: 1
        healthcheck:
            test: ["CMD", "curl", "-f", "https://www.cloudflare.com/cdn-cgi/trace"]
            interval: 30s
            timeout: 10s
            retries: 5

volumes:
    redis-data:
```

Run `Rsshub`:
```bash
# launch
docker-compose up -d
# Manual update
docker-compose pull
```

Use [watchtower](https://github.com/containrrr/watchtower) for automatically update.

Open `http://{Server_IP}:1200` in your browser, and enjoy! ✅
![RssHub](/images/posts/back-to-rss/rsshub.png)

## Generate your Feeds

### Find Routes on the Original Website

While many modern websites have phased out RSS, it’s surprising how many still rely on this dependable syndication method—especially government information portals.

If you take a moment to inspect the HTML source of these sites, you'll often uncover hidden RSS or Atom feed links tucked away in the metadata. These feeds are typically marked by XML tags like `<link rel="alternate" type="application/rss+xml">` or `<link rel="alternate" type="application/atom+xml">`.

### Routes supported by RSSHub

You can easily find RSS link on Government, academic and research institutions, news organizations, Technical communities and some other professional organizations, which frequently maintain RSS feeds for standards updates, regulatory changes, and news. But large social media and content comsuming websites don't typically support RSS becuase they tries to keep users in their own websites.

Check the corresponding RSSHub [routes](https://docs.rsshub.app/routes/popular) and find out what you like. Install the [RSS Feed URL Finder](https://chromewebstore.google.com/detail/rss-feed-url-finder/apfhghblgifegckccakakdlbjcdnbjmb?pli=1) extension and it can finds subscription URL if the website you're browing supports it.

If requested, go to [Route-specific Configurations](https://docs.rsshub.app/deploy/config#route-specific-configurations) page to update your personal information to access the APIs.

#### Custom Routes with RSSHub

See another post *"Create routes with RSSHub"*.

## Final Thoughts: Everything Must Be Paid for Twice

I recently read an [article](https://www.raptitude.com/2022/01/everything-must-be-paid-for-twice/) that argues every purchase comes with a hidden double cost. The first cost is the money we pay to acquire an item, and the second is the **investment of time, effort, and energy** required to use it effectively and reap its full benefits.

This concept applies to nearly every purchase we make in modern society—from food ingredients and books to online services. After using these services, it’s crucial to spend time reading and obtaining first-hand information rather than spending the entire day on platforms like TikTok or other social media channels, where we often rely on second-hand interpretations.

---

<!-- <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
  <h2 style="margin-top: 0; color: #fff; font-family: Arial, sans-serif;">You made it here! Thanks for reading.</h2>
  <p style="color: #ccc; font-family: Arial, sans-serif;">We appreciate your support and feedback. Your contributions make a real difference!</p>
</div> -->