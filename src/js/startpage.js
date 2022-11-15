import { $ } from './utils';
import './weather';
import '../css/startpage.css';
import configJSON from'../config.json';

forCate();

// 循环链接
function forLlinks(cate) {
    let linkCard = document.querySelector('#card-container>div');
    let urlReg = /http(s?):\/\/(.+[^\/])/;
    let linkCount = 0;

    document.querySelector('#card-container').innerHTML = '';

    for (const linkCate of configJSON.stock) {
        for (const link of linkCate.links) {
            linkCount++;

            if (linkCate.cate === cate) {
                let linkCardTemp = linkCard.cloneNode(true);
                linkCardTemp.querySelector('h2').textContent = link.name;
                linkCardTemp.querySelector('a').href = link.url;
                linkCardTemp.querySelector('span').textContent = urlReg.exec(link.url)[2]; // 匹配网址
                document.querySelector('#card-container').appendChild(linkCardTemp);
            }
        }
    }
    linkCard.style.display = 'none';

    document.querySelector('#linkCount').textContent = linkCount;
}

// 循环分类
function forCate() {
    let cateCard = document.querySelector('#cate-container>button');
    let cateCount = 0;

    for (const linkCate of configJSON.stock) {
        cateCount++;
        let cateCardTemp = cateCard.cloneNode(true);

        cateCardTemp.querySelector('span').textContent = linkCate.cate;
        cateCardTemp.querySelector('svg').outerHTML = linkCate.icon;
        cateCardTemp.dataset.catename = linkCate.cate;

        if (cateCount === 1) {
            forLlinks(linkCate.cate);
        } else {
            cateCardTemp.classList.remove('border-slate-600');
        }

        cateCardTemp.addEventListener('click', function () {
            forLlinks(this.dataset.catename);
            Array.from(this.parentElement.children).forEach((el) => {
                el.classList.remove('border-slate-600');
            });
            this.classList.add('border-slate-600');
        });

        document.querySelector('#cate-container').appendChild(cateCardTemp);
    }

    cateCard.style.display = 'none';
    document.querySelector('#cateCount').textContent = cateCount;
}

function uptime() {
    $.loadJSON('http://207.246.84.123:8090/https://status.arcticalpaca.com/json/stats.json', (data) => {
        var tempHTML = '';
        for (const server of data.servers) {
            let serverLoad = server['load_1'] || '0.00'; // 如果load为0，这里进行处理
            tempHTML += `
                <div class="px-1 border-l border-r border-white first:border-none last:border-none">
                    <span>${server['location']}</span>
                    <span>${serverLoad.toString().padEnd(4, 0)}</span>
                </div>
            `;
        }
        document.querySelector('#server-status').innerHTML = tempHTML;
    });
}

uptime();
setInterval(() => {
    uptime();
}, 5000);
