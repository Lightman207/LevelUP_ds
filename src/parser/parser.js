const axios = require('axios');
const cherio = require('cheerio');

const parse = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url);
        return cherio.load(data);
    }

    const $ = await getHTML('https://stopgame.ru/news/all/p1')

    $('._card_11mk8_1').each((i, element) => {
        if (i <= 5) {
            const title = $(element).find('._title_11mk8_60').text();
            const link = $(element).find('a').attr('href');
        }
    });
}