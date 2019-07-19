const titleConfig = {
    'ql-bold': '粗體',
    'ql-italic': '斜體',
    'ql-link': '加入連結',
    'ql-size': '字體大小',
    'ql-list': '項目符號',
    'ql-image': '圖片',
};

export function addQuillTitle() {
    const oToolBar = document.querySelector('.ql-toolbar'),
        aButton = oToolBar.querySelectorAll('button'),
        aSelect = oToolBar.querySelectorAll('select');
    aButton.forEach(function(item) {
        if (item.className === 'ql-script') {
            item.value === 'sub' ? item.title = '下标' : item.title = '上标';
        } else if (item.className === 'ql-indent') {
            item.value === '+1' ? item.title = '向右缩进' : item.title = '向左缩进';
        } else {
            item.title = titleConfig[item.classList[0]];
        }
    });
    aSelect.forEach(function(item) {
        item.parentNode.title = titleConfig[item.classList[0]];
    });
}