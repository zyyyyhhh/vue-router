var Main=Vue.component('Main',{
    template:`
    <div class="template">
       <div class="body">
          <div class="left">
             <router-view name="left"></router-view>
          </div>
          <div class="right">
             <router-view name="right"></router-view>
          </div>
       </div>
    </div>      
    `,
});
var Left = Vue.component('Left',{
    data(){
        return{
            menu:[
                /* {"id":"1","title":"abc","pid":"0"},
                 {"id":"2","title":"frfr","pid":"1"},
                 {"id":"3","title":"gtgt","pid":"1"},
                 {"id":"4","title":"jukiuu","pid":"0"},                           {"id":"5","title":"swsw","pid":"4"},
                 {"id":"6","title":"swswsws","pid":"4"},
                 {"id":"7","title":"hyhy","pid":"0"}*/
            ]
        }
    },
    computed:{
       parse(){
           var arr = [];
           for(var i in this.menu){
               if(this.menu[i].pid == 0){
                  var obj = this.menu[i];
                  arr.push(obj);
               }else{
                   for(var j in arr){
                       if(this.menu[i].pid == arr[j].id){
                           if(arr[j].child){
                               arr[j].child.push(this.menu[i])
                           }else{
                               arr[j].child = [];
                               arr[j].child.push(this.menu[i])
                           }
                       }
                   }
               }
           }
           return arr;
       }
    },
    created(){
        fetch("./demo.txt").then(function (e) {
            return e.json();
        }).then((e)=>{
            this.menu = e;
        })
    },
    watch:{
        $route(){
            var num = this.$route.hash.slice(1);
            var pos = document.querySelector("#a"+num).offsetTop+8;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate);
                }
            }
            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop=this.number.toFixed(0)
                })
                .start()

            animate();
        }
    },
    template:`<div>
        <ul v-for="item in parse">
            <li style="cursor: pointer"><router-link :to="'#'+item.id" style="color:#24292e">{{item.title}}</router-link></li>
            <ul> 
                <li v-for="item1 in item.child" style="cursor: pointer"><router-link :to="'#'+item1.id" style="color:#24292e">{{item1.title}}</router-link></li>
            </ul> 
        </ul>
    </div>`
});


var Right=Vue.component('Right',{
    template:`<div v-html="name" class="markdown-body">
        
    </div>`,
    data(){
        return{
            name:""
        }
    },
    mounted(){
        fetch("./demo1.txt").then(function (e) {
            return e.text();
        }).then((e)=>{
            this.name = e;
        })
    }
})

var quick = Vue.component('quick',{
    template:`
        <div style="border:1px solid red;width: 100%;height: 200px;margin-top: 40px;">{{data}}</div>
    `,
    data(){
        return{
            data:"zhangsan"
        }
    }
})