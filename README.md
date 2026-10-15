# ~$ whoami  
**João – tech enthusiast, breaker of things, occasional fixer**  

Hey, my name is João and I’m a **tech enthusiast** who loves breaking things, not always fixing them, and sometimes learning along the way. I’m currently a student, so between classes and life, I try to spend time diving into **cybersecurity**, tinkering with **electronics** and playing some video games.  

This repo is basically my **personal brain dump**, where I document my projects, things I’m learning, and random experiments.  

🚧 *Still a work in progress... updates will come whenever I get around to it!* 😆  

### 📬 Find me here: 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaopefer/)

## Website

Personal website at **https://jopefer.com**, hosted on GitHub Pages. Projects such as Urbanos and Jarvis keep their own subdomains and deployments.

The homepage uses a custom MkDocs template (`overrides/portfolio.html`) with small, dependency-free CSS and JavaScript assets in `docs/assets/portfolio/`. The existing project guides remain available in English and Portuguese. The pointer interaction respects reduced-motion settings and has a pause control; the theme follows the system unless the visitor chooses otherwise.

### Preview and publish

Install with `python -m pip install -r requirements.txt`, then run `python -m mkdocs serve`. Validate with `python -m mkdocs build --strict`. Pushing to `main` runs `.github/workflows/pages.yml`, builds from source, and deploys to GitHub Pages.

GitHub Pages must use **GitHub Actions** as its publishing source and **jopefer.com** as its custom domain. `docs/CNAME` also preserves the domain in local builds.

### Domain

In Cloudflare, point `@` to `joaopef.github.io` using a DNS-only CNAME (Cloudflare flattens it at the apex). Optionally point `www` to the same hostname. Keep the existing project subdomain records. Enable Enforce HTTPS in GitHub Pages once GitHub has issued the certificate.
