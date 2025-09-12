{
  "builds": [
    {
        "src": "backend.js",
         "use": "@vercel/node"
         }
  ],
  "routes": [
    {
        "src": "/(.*)",
         "dest": "/backend.js"
        }
  ]
}
