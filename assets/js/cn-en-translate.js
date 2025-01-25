$(document).ready(function () {
    // 初始化语言状态
    let currentLang = 'cn'; // 默认中文
    
    // 加载翻译文件
    $.getJSON('assets/i18n/i18n_en.json', function(data) {
        const translations = data;
        
        // 翻译按钮点击事件
        $('#translate').click(function(e) {
            e.preventDefault();
            
            if (currentLang === 'cn') {
                // 切换到英文
                $('[i18n]').each(function() {
                    const key = $(this).attr('i18n');
                    if (translations[key]) {
                        $(this).html(translations[key]);
                    }
                });
                $('#translate span').text('En/中');
                currentLang = 'en';
            } else {
                // 切换回中文
                $('[i18n]').each(function() {
                    const key = $(this).attr('i18n');
                    // 从 HTML 中获取原始中文
                    const originalText = $(this).attr('data-original');
                    if (originalText) {
                        $(this).html(originalText);
                    }
                });
                $('#translate span').text('中/En');
                currentLang = 'cn';
            }
        });
        
        // 初始化时保存所有中文文本
        $('[i18n]').each(function() {
            $(this).attr('data-original', $(this).html());
        });
    });
});
