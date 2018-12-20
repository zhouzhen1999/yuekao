require(["./js/main.js"], function() {
    require(["jquery", "bscroll"], function($, bscroll) {
        let pagenum = 1,
            limit = 5,
            totle = 0,
            type = "",
            key = "";

        function init(type, key) {
            type = type,
                key = key;
            $.ajax({
                url: "/api/list",
                type: "get",
                data: {
                    pagenum: pagenum,
                    limit: limit,
                    type: type,
                    key: key
                },
                dataType: "json",
                success: function(res) {
                    if (res.code == 0) {
                        totle = res.totle;
                        render(res.datas);
                    }
                }
            })
        }

        function render(data) {
            var str = "";
            $.each(data, function(i, item) {
                str += `<dl>
                            <dt><img src="${item.img}" alt=""></dt>
                            <dd>
                                <b>${item.title}</b>
                                <p>${item.content}</p>
                                <p><span>${item.money}</span></p>
                                <p>信用:${item.credit}</p>
                            </dd>
                        </dl> `;
            })
            $(".container").append(str);
            scroll.refresh();
        }

        var scroll = new bscroll(".wrapper", {
            probeType: 2
        })

        scroll.on("scroll", function(position) {
            if (position.y < this.maxScrollY - 30) {
                if (pagenum < totle) {
                    $(".container").attr("up", "释放加载更多")
                } else {
                    $(".container").attr("up", "没有更多数据")
                }

            } else if (position.y < this.maxScrollY - 15) {
                if (pagenum < totle) {
                    $(".container").attr("up", "上拉加载")
                } else {
                    $(".container").attr("up", "没有更多数据")
                }
            }
        })

        scroll.on("touchEnd", function() {
            if ($(".container").attr("up") == "释放加载更多") {
                if (pagenum < totle) {
                    pagenum++;
                    init(type, key)
                }
            }
        })
        $("#tab").on("click", function() {
            $("#p").show();
        })

        $("#p").on("click", "li", function() {
            $(".container").html("");
            pagenum = 1;
            type = $(this).attr("data-id");
            init(type, key)
        })

        $("#btn").on("click", function() {
            key = $("#inp").val();
            $(".container").html("");
            pagenum = 1;
            init(type, key);
        })
        init(type, key);
        // function addEvent() {
        //     $("#tab").on("touchstart", function() {
        //         $("#p").show()
        //     })
        //     $("#p li").on("touchstart", function() {
        //         $(".container dl").addClass("float")
        //     })
        // }

        // var scroll = new bscroll(".wrapper", {
        //     probeType: 1
        // })

        // scroll.on("scroll", function(position) {
        //     if (position.y < this.maxScrollY - 44) {
        //         $(".container").attr("up", "释放加载更多")
        //     } else if (position.y < this.maxScrollY - 22) {
        //         $(".container").attr("up", "上拉加载")
        //     }
        // })

        // scroll.on("touchEnd", function() {
        //         if ($(".container").attr("up") == "释放加载更多") {
        //             console.log(111)
        //         }
        //     })
        // scroll.on("scroll", function(position) {
        //     if (position.y > 30) {
        //         $(".top").css({
        //             "top": ".3rem"
        //         })
        //         setTimeout((i) => {
        //             $(".top").hide();
        //             $(".alert").show()
        //         }, 1000)

        //         setTimeout((i) => {
        //             $(".alert").hide()
        //         }, 2000)
        //     } else if (position.y < this.maxScrollY - 30) {
        //         scroll.refresh()
        //         init()
        //         $(".bottom").css({
        //             "bottom": ".3rem"
        //         })

        //     }
        // })


    })
})



function num(proto) {
    return function(a, b) {
        return a[proto] > b[proto]
    }
}