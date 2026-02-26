self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/choose-country",
        "destination": "/country/choose"
      },
      {
        "source": "/uk",
        "destination": "/country/uk"
      },
      {
        "source": "/uk/:path*",
        "destination": "/country/uk/:path*"
      },
      {
        "source": "/usa",
        "destination": "/country/usa"
      },
      {
        "source": "/usa/:path*",
        "destination": "/country/usa/:path*"
      },
      {
        "source": "/srilanka",
        "destination": "/country/srilanka"
      },
      {
        "source": "/srilanka/:path*",
        "destination": "/country/srilanka/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/country/choose",
    "/country/srilanka",
    "/country/uk",
    "/country/usa",
    "/uk",
    "/uk/_seo",
    "/uk/cities/[city]",
    "/uk/projects",
    "/uk/sitemap.xml"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()