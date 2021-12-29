const discord = require('discord.js')
const osu = require('node-osu')

module.exports = {
    name: 'osu',
    aliases: [''],
    /**
     * @param {Message} message
     * @param {Client} client
     * @param {String[]} args
     */
     execute: async(client, message, args) => {
         const osuapi = new osu.Api('YOUR API', {
            notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
            completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
            parseNumeric: true // Parse numeric values into numbers/floats, excluding ids
         })
        if(args[0] == 'beatmap') {
        if(!args[0]) {
            message.channel.send({embed: {
                description: 'Please choose a action!',
                color: 'RED'
            }})
        }

         if(!args[1]) {
             message.channel.send({embed: {
                 description: 'Please type beatmap ID',
                 color: 'RED'
             }})
         }

         var beatmap = args[1]


         osuapi.getBeatmaps({ b: `${beatmap}` }).then(map => {
             console.log(map) //get the beatmap detail

             const star = map[0].rating;
             if( 0 <= star <= 1.99) {
                 var starrate = require('../../assits/easy.png')
             }
             if( 2 <= star <= 2.69) {
                 var starrate = require('../../assits/normal.png')
             }
             if( 2.7 <= star <= 3.99) {
                var starrate = require('../../assits/hard.png')
            }
             if( 4.0 <= star <= 5.29) {
                var starrate = require('../../assits/insane.png')
            }
             if( 5.3 <= star <= 6.49) {
                var starrate = require('../../assits/expert.png')
            }
             if( star >= 6.5) {
                var starrate = require('../../assits/expert+.png')
            }
             //get beatmap link
             const beatmaplink = `https://osu.ppy.sh/b/${map[0].id}`
             
             //get beatmap header
             const beatmapHeader = `https://assets.ppy.sh/beatmaps/${map[0].beatmapSetId}/covers/cover.jpg`

             //create embed
             const embed = new discord.MessageEmbed()

             .setAuthor(`${map[0].artist} - ${map[0].title}`, message.author.displayAvatarURL({ size: 2048 }))
             .setImage(beatmapHeader)
             .setColor('#ff66aa')
             .setDescription(
                 `**▸Length:** ${Math.floor(map[0].length.total / 60) + ':' + (map[0].length.total % 60 < 10 ? '0' + (map[0].length.total % 60) : map[0].length.total % 60)} ▸**BPM:** ${map[0].bpm}\n
                 **Download:** [map](https://osu.ppy.sh/beatmaps/${map[0].beatmapSetId}/download)**|**['no video'](https://osu.ppy.sh/beatmaps/${map[0].beatmapSetId}/download?noVideo=1)\n
                 ${starrate}**__${map[0].version}__**`
             )
             message.channel.send(embed)
             }
            )
        }
    }
}