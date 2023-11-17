require('dotenv').config()

const config = {
   "prefix": "!",
   "colors": {
       "void": 0x2f3136,
       "brand": 0x000000
   },
   "brand_name": "Maisons",
   "media": {
       "boss": {
           "duriel": "https://cdn.discordapp.com/attachments/1172983109411688458/1173569223117779015/0.png",
           "zyr": "https://cdn.discordapp.com/attachments/1172983109411688458/1175039561924087829/Diablo-4-How-to-get-Exquisite-Blood-and-summon-Lord-Zir.png",
           "varshan": "https://cdn.discordapp.com/attachments/1172983109411688458/1175040068600221706/z.png"
       },
       "dashboard": "https://cdn.discordapp.com/attachments/1172983109411688458/1174054895213621329/Dashboard.png",
       "downPage": "https://cdn.discordapp.com/attachments/1034106468800135168/1041668169426817044/downpage_1.png",
       "guide": "https://cdn.discordapp.com/attachments/1172983109411688458/1174428750167932978/guide.png"
   },
   "categories": {
       "quickplay": '1173560986519740486',
       "raids": '1172961227379576832'
   }
}

module.exports = config