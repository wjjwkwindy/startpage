$.loadJSON('config.json', (configJSON) => {
    let linkCount = 0,
        cateCount = 0;

    let linkCard = document.querySelector('#test>div');

    for (const linkCate of configJSON.stock) {
        cateCount++;
        for (const link of linkCate.links) {
            linkCount++;
            let linkCardTemp = linkCard.cloneNode(true);
            linkCardTemp.querySelector('h2').textContent = link.name;
            linkCardTemp.querySelector('a').href = link.url;
            document.querySelector('#test').appendChild(linkCardTemp);
        }
    }

    linkCard.style.display = 'none';
    document.querySelector('#linkCount').textContent = linkCount;
    document.querySelector('#cateCount').textContent = cateCount;
});
