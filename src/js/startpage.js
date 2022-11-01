$.loadJSON('config.json', (configJSON) => {
    let linkCount = 0,
        cateCount = 0,
        urlReg = /http(s?):\/\/(.+)\//;

    let linkCard = document.querySelector('#test>div');

    for (const linkCate of configJSON.stock) {
        cateCount++;
        for (const link of linkCate.links) {
            linkCount++;
            let linkCardTemp = linkCard.cloneNode(true);
            linkCardTemp.querySelector('h2').textContent = link.name;
            linkCardTemp.querySelector('a').href = link.url;
            linkCardTemp.querySelector('span').textContent = urlReg.exec(link.url)[2]; // 匹配网址
            document.querySelector('#test').appendChild(linkCardTemp);
        }
    }

    linkCard.style.display = 'none';
    document.querySelector('#linkCount').textContent = linkCount;
    document.querySelector('#cateCount').textContent = cateCount;
});

function uptime() {
    $.loadJSON('http://207.246.84.123:8090/https://status.arcticalpaca.com/json/stats.json', (data) => {
        var tempHTML = '';
        for (const server of data.servers) {
            let serverLoad = server['load_1'] || '0.00';// 如果load为0，这里进行处理
            tempHTML += `
                <div class="px-1 border-l border-r border-white first:border-none last:border-none">
                    <span>${server['location']}</span>
                    <span>${serverLoad.toString().padEnd(4,0)}</span>
                </div>
            `;
        }
        document.querySelector('#server-status').innerHTML = tempHTML;
    })
}

uptime();
setInterval(() => {
    uptime();
}, 2000);