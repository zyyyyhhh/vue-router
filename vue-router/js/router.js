var router=new VueRouter({
    routes:[
        {   path:'/',
            component:Main,
            children:[
                {   path:'',
                    components:{
                        left:Left,
                        right:Right
                    }},
            ]
        },
        {
            path:'/quick',
            component:quick
        }
    ]
})