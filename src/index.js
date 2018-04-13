import './css/index.less'

window.onload = () => {
    console.log($);
    let a = document.createElement('a');
    a.innerHTML = 'test h1';
    a.href = 'b.html';
    document.body.appendChild(a);
};