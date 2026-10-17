# Cloudflare DNS — alfahost.eu → VPS

**Origin IP:** `5.83.150.237`  
**SSL/TLS mode in Cloudflare:** **Full** (required).  
Do **not** use Flexible — it causes an HTTPS redirect loop with the origin.  
Full Strict only after you install a Cloudflare Origin Certificate.

## Records to set (Proxy = ON / orange cloud)

| Type | Name | Content           | Proxy | TTL  |
|------|------|-------------------|-------|------|
| A    | `@`  | `5.83.150.237`    | Proxied | Auto |
| A    | `www`| `5.83.150.237`    | Proxied | Auto |

Optional (same IP, proxied), if you want them on this box later:

| Type | Name | Content        | Proxy |
|------|------|----------------|-------|
| A    | `papi` | `5.83.150.237` | Proxied |
| A    | `cp`   | `5.83.150.237` | Proxied |

## After changing DNS

1. Cloudflare → SSL/TLS → Overview → **Full**
2. Wait for DNS (usually &lt; 1 min with CF)
3. Open https://alfahost.eu/ — should hit the VPS nginx vhost

## Remove GitHub Pages as the site origin

- Cloudflare must **not** point `@` / `www` at GitHub Pages IPs anymore.
- In GitHub repo → Settings → Pages you can disable Pages (optional; deploys now go to the VPS).

## CI

Every push to `main` builds the Next static export and rsyncs to `/var/www/alfahost.eu` on the VPS.
