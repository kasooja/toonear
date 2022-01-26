posts = [
    {title: 'P1', text: 'This is the content of P1'},
    {title: 'P2', text: 'this is the content of P2'}
]

function getPost() {
 let output = ''
 posts.forEach(element => {
     output += `<li>${element['title']}</li>`
 });
 document.body.innerHTML=output;
}