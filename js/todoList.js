
$(function () {
    let head=$(".head>li");
    let list =$(".list");
    let type = '';
    let todoList = [
        {
          id:1,  content:'为你我用了半年的积蓄', ctime:'2019-06-04',status:true
        },
        {
            id:2,  content:'漂洋过海的来看你', ctime:'2019-06-04',status:true
        },
        {
            id:3,  content:'为了这次相聚', ctime:'2019-06-04',status:false
        },
        {
            id:4,  content:'我连见面时的呼吸都曾反复练习', ctime:'2019-06-04',status:false
        },

    ]

/*
    let str = localStorage.getItem("todoList");
    if (!str){
        localStorage.setItem("todoList",JSON.stringify(todoList));
    }
    todoList = JSON.parse(str);*/

    head.on('click',function () {
        let _this = $(this);
        type = _this.attr('type');
        _this.addClass('hot').siblings('li').removeClass('hot');
        render(filterDate(type));
    })
    head.triggerHandler('click')

    list.on('click', function (e) {
        let target = e.target;
        let parent = target.parentNode;
        let id = parent.id;
        if(target.nodeName ==="SPAN"){
            parent.classList.toggle("list-hot")
            let arr = todoList.filter(eles=>eles.id==id)[0];
            if(!arr.status) {
                arr.status = true;
            }
            else if(arr.status){
                arr.status =false;
            }
            render(filterDate(type));
        }
        else if(target.nodeName === "DEL"){
            let index=todoList.findIndex(ele=>ele.id==id);
            todoList.splice(index,1);
            render(filterDate(type));
        }
    })

    let forms = document.forms[0];
    let thing = forms.thing;
    let time = forms.time;
    let add = forms.add;
    add.onclick = function (e) {
        e.preventDefault();
        if (thing.value && time.value) {
            let obj = creatObj();
            todoList.push(obj);
            forms.reset();
            render(filterDate(type));

        }
        else {
            alert("请完整输入任务内容及时间！")
        }
    }

    

    function creatObj() {
        let id = "";
        if (todoList.length) {
            id = todoList[todoList.length - 1].id + 1;
        }else if (!todoList.length){
            id = 0;
        }
        let content = thing.value;
        let ctime = time.value;
        let status = false;
        return {id,content,ctime,status}
    }
    /*
        let listLi=document.querySelectorAll(".list>li");
        listLi.forEach(function (elem) {
            elem.onclick = function () {
                console.log(this);
                this.classList.toggle("list-hot");
                    let id = this.id;
                console.log(id);
                let arr = todoList.filter(eles=>eles.id==id)[0];
                console.log(arr);
                arr.status = true;
            }
        });*/

    function filterDate(type) {
        let arr = [];
        switch (type) {
            case 'all':
                arr = todoList;
                break;
            case 'finish':
                arr = todoList.filter(ele=> ele.status);
                break;
            case  'doing':
                arr = todoList.filter(ele=> !ele.status);
                break;
        }
        return arr;
    }
    
    function render(arr) {
        let html ='';
        arr.forEach(function (ele) {
            if(ele.status){
                html +=`
                    <li class="list-hot" id="${ele.id}"><span></span>${ele.content} <del>✘</del><time>${ele.ctime}</time></li>
                `;
            }
            else{
                html+=`
                    <li id="${ele.id}"><span></span>${ele.content} <del>✘</del><time>${ele.ctime}</time></li>  
                `;
            }
        })
        if (html==''){
            list.html('暂无内容');
        }
        else {
            list.html(html);
        }
    }
})
