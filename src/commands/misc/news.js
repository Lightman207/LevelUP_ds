const { Client, Interaction } = require("discord.js");
const axios = require('axios');
const cherio = require('cheerio');


module.exports = {
    name: 'news',
    description: 'Send fresh news for you!',
    // deleted: Boolean,
    // devOnly: Boolean,
    // textOnly: Boolean,
    // options: Object[],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (_client, interaction) => {
        let news = ``;
        const parse = async () => {
            const getHTML = async (url) => {
                const { data } = await axios.get(url);
                return cherio.load(data);
            }
            const $ = await getHTML('https://stopgame.ru/news/all/p1');
        

            $('._card_11mk8_1').each((i, element) => {
                if (i <= 5) {
                    const title = $(element).find('._title_11mk8_60').text();
                    const link = $(element).find('a').attr('href');
                    news += `\n[${title}](https://stopgame.ru${link})`;
                }
            });
            interaction.reply(news);
        }
        parse();
    }
};