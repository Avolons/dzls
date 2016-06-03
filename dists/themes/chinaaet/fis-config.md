###Welcome to use MarkDown
// 所有的文件产出到 static/ 目录下
fis.match('*', {
    release: '/static/$0'
});

// 所有模板放到 tempalte 目录下
fis.match('*.html', {
    release: '/template/$0'
});

// widget源码目录下的资源被标注为组件
fis.match('/widget/**/*', {
    isMod: true
});

// widget下的 js 调用 jswrapper 进行自动化组件化封装
fis.match('/widget/**/*.js', {
    postprocessor: fis.plugin('jswrapper', {
        type: 'commonjs'
    })
});

// test 目录下的原封不动产出到 test 目录下
fis.match('/test/**/*', {
    release: '$0'
});

//对page下的scss文件进行转换
fis.match('/page/**/*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass')
})

// optimize
fis.media('prod')
    .match('*.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'define', 'some string'] //不想被压的
            }
        })
    })
    .match('*.css', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    });

// pack
fis.media('prod')
    // 启用打包插件，必须匹配 ::package
    .match('::package', {
        packager: fis.plugin('map'),
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '15'
        })
    })
    .match('*.js', {
        packTo: '/static/all_others.js'
    })
    .match('*.css', {
        packTo: '/staitc/all_others.css'
    })
    .match('/widget/**/*.js', {
        packTo: '/static/all_comp.js'
    })
    .match('/widget/**/*.css', {
        packTo: '/static/all_comp.css'
    });