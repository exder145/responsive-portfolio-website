$(document).ready(function () {
    // 默认使用中文
    const defaultLang = "cn";
    
    // 初始化时强制使用中文
    localStorage.setItem("lang", defaultLang);
    
    // 首次加载语言
    loadLanguage(defaultLang);
    
    // 点击切换语言
    $(document).on("click", "#translate", function (e) {
        e.preventDefault();
        const currentLang = localStorage.getItem("lang") || defaultLang;
        const targetLang = currentLang === "cn" ? "en" : "cn";
        
        // 加载新语言
        loadLanguage(targetLang);
        
        // 更新按钮文本
        updateTranslateButton(targetLang);
        
        console.log("Language button clicked. Switching to:", targetLang);
    });

    function updateTranslateButton(lang) {
        const text = lang === "cn" ? "中/En" : "En/中";
        $("#translate span").html(text);
    }

    function loadLanguage(lang) {
        console.log("Loading language:", lang);
        
        $.ajax({
            url: `assets/i18n/i18n_${lang}.json`,
            dataType: 'json',
            success: function(data) {
                $("[i18n]").each(function() {
                    const key = $(this).attr("i18n");
                    if (data[key]) {
                        if ($(this).is("input")) {
                            $(this).val(data[key]);
                        } else {
                            $(this).html(data[key]);
                        }
                    }
                });
                
                localStorage.setItem("lang", lang);
                console.log("Successfully switched to:", lang);
            },
            error: function(xhr, status, error) {
                console.error("Failed to load language file:", error);
                console.error("Status:", status);
                console.error("Response:", xhr.responseText);
            }
        });
    }
});
