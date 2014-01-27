/**----------------------------------------------**/
/**-------------------my tools-------------------**/
/**----------------------------------------------**/

//lodash extend : _.fastEach
(function(ns) {

    var fastEach = function(items, process) {

        if (!items) {
            return false;
        }

        var len = items.length,
            iterations = len % 8,
            i = (len - 1) | 0;

        while (iterations) {
            process(items[i--], i);
            iterations--;
        }

        iterations = Math.floor(len / 8) | 0;

        while (iterations) {
            process(items[i--], i);
            process(items[i--], i);
            process(items[i--], i);
            process(items[i--], i);
            process(items[i--], i);
            process(items[i--], i);
            process(items[i--], i);
            process(items[i--], i);
            iterations--;
        }
        return false;
    };

    ns.fastEach = fastEach;

})(_ || {});


//lodash extend : _.asyncLoop
// use : _.asyncLoop(option)
// _.asyncLoop({
//     items: [1, 2, 3, 4, 5],
//     outFn: function(d) {
//         console.log(d)
//     },
//     callback: function(d) {
//         console.log('Ha');
//     },
//     delay: 200
// });

(function(ns) {
    var asyncLoop = function(option) {

        var items = option.items;

        if (!option.delay) {
            option.delay = 10;
        }

        function processArray(items, process, callback) {
            var todo = items.concat();

            setTimeout(function() {
                process(todo.shift());

                if (todo.length > 0) {
                    setTimeout(arguments.callee, option.delay);
                } else {
                    callback(items);
                }
            }, option.delay);
        }

        processArray(items, option.outFn, function() {
            console.log('Done');

            if (option.callback) {
                option.callback();
            }
        });
    };

    ns.asyncLoop = asyncLoop;

})(_ || {});


var APP = window.APP = {};

//APP myArea
(function(ns) {



    var myArea = {
        append: function(target) {

            var me = this;

            var baseBox = '';
            var container = $('.container');
            var currentId = $('.write_box').size();
            var atatchedId = '';

            baseBox += '<div id="box_' + (currentId + 1) + '" class="write_box">';
            baseBox += '<textarea cols="80" rows="5" maxlength="220" tabindex="' + (currentId + 1) + '"></textarea>';
            baseBox += '<p style="text-align:center;">- ' + (currentId + 1) + '-</p>';
            baseBox += '</div>';

            container.append(baseBox);


            
        },
        add: function(target) {
            
            var baseBox = '';
            var container = $('.container');
            var currentId = $('.write_box').size();
            var atatchedId = '';

            baseBox += '<div id="box_' + (currentId + 1) + '" class="write_box">';
            baseBox += '<textarea cols="80" rows="5" maxlength="200" tabindex="' + (currentId + 1) + '"></textarea>';
            baseBox += '<p style="text-align:center;">- ' + (currentId + 1) + '-</p>';
            baseBox += '</div>';

            target.parent().prev().append(baseBox);
        },
        remove: function(target) {
            target.remove();
        },
        analy: function(target) {
            console.log(target);
        },
        view : function(){
            var write_box = $('.write_box').find('textarea');
            var result = '';
            write_box.each(function(){
                var $this = $(this);
                var c_val = $this.val();
                var newDom = '';
                if(c_val.length > 0) {
                    newDom = '<p>' + c_val + '</p>';
                }
                result += newDom;
            });

            result = '<div class="result">' + result + '</div>';
            
            $('.result').remove();

            $('.container').append(result);

        }
    };

    ns.myArea = myArea;

})(APP || {});

/**----------------------------------------------**/
/**-------------------main modules---------------**/
/**----------------------------------------------**/

// library loader
(function($) {

    _.asyncLoop({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        outFn: APP.myArea.append,
        callback: function() {
            var newDom = '<p style="text-align:center;"><button id="add">추가';
            newDom += '</button> <button id="view">보기</button></p>';
            
            $('.container').append(newDom);
            $('#add').on('click', function() {
                APP.myArea.add($(this));
            });

            $('#view').on('click', function() {
                APP.myArea.view();
            });

            $('.search_word').focus();
        },
        delay: 50
    });

    // $.
    // getScript(url).
    // done().
    // fail()

})(jQuery);
