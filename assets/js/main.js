/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // 点击每个菜单链接后收起菜单栏
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

      function toggleSkills() {
        let itemClass = this.parentNode.className

        for(i = 0; i < skillsContent.length; i++) {
          skillsContent[i].className = 'skills__content skills__close'
        }
        if(itemClass === 'skills__content skills__close'){
          this.parentNode.className = 'skills__content skills__open'
        }
      }
      
      skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills)
      })

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    console.log('click disparado')
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })
    target.classList.add('qualification__active')

    tabs.forEach(tab => {
      tab.classList.remove('qualification__active')
    })
    tab.classList.add('qualification__active')
  })
})


/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    sections.forEach(current =>{
        const sectionHeight = current.clientHeight
        const sectionTop = current.getBoundingClientRect().top;
        const sectionId = current.getAttribute('id')
        // section 位于视口中间时添加样式 active-link
        if(sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= window.innerHeight / 2){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
  }
  window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME & LANGUAGE====================*/ 

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const language = 'cn'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== INITIALIZE TRANSLATION ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize translation
    const translateButton = document.getElementById('translate');
    if (translateButton) {
        translateButton.addEventListener('click', function() {
            const currentLang = $('html').attr('lang');
            const newLang = currentLang === 'en' ? 'cn' : 'en';
            $('html').attr('lang', newLang);
            $.i18n().locale = newLang;
            $('[i18n]').i18n();
        });
    }
    
    // Set initial language
    $('html').attr('lang', 'cn');
    $.i18n().locale = 'cn';
    $('[i18n]').i18n();
});

const awardItems = document.querySelectorAll('.awards__item')

awardItems.forEach((item) => {
    const awardHeader = item.querySelector('.awards__header')

    awardHeader.addEventListener('click', () => {
        item.classList.toggle('open')
    })
})

/*==================== PORTFOLIO NAVIGATION ====================*/
const portfolioContent = document.querySelector('.portfolio__content');
const portfolioItems = [
    {
        title: 'portfolio1__title',
        description: 'portfolio1__description'
    },
    {
        title: 'portfolio2__title',
        description: 'portfolio2__description'
    }
];

let currentPortfolioIndex = 0;

// 更新项目内容
function updatePortfolioContent(index) {
    const item = portfolioItems[index];
    const title = document.querySelector('.portfolio__title');
    const description = document.querySelector('.portfolio__description');
    
    // 获取当前语言的翻译
    const currentLang = localStorage.getItem('lang') || 'cn';
    const translations = currentLang === 'cn' ? i18n_cn : i18n_en;
    
    title.setAttribute('i18n', item.title);
    description.setAttribute('i18n', item.description);
    
    title.textContent = translations[item.title];
    description.textContent = translations[item.description];
}

// 添加翻页事件监听
document.querySelector('.portfolio__arrow-left').addEventListener('click', () => {
    currentPortfolioIndex = (currentPortfolioIndex - 1 + portfolioItems.length) % portfolioItems.length;
    updatePortfolioContent(currentPortfolioIndex);
});

document.querySelector('.portfolio__arrow-right').addEventListener('click', () => {
    currentPortfolioIndex = (currentPortfolioIndex + 1) % portfolioItems.length;
    updatePortfolioContent(currentPortfolioIndex);
});

// 初始化显示第一个项目
updatePortfolioContent(0);

/*==================== COPY TO CLIPBOARD ====================*/
function copyToClipboard(text) {
    // 创建临时输入框
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    
    // 选择并复制
    tempInput.select();
    document.execCommand('copy');
    
    // 移除临时输入框
    document.body.removeChild(tempInput);
    
    // 显示提示
    const copyAlert = document.getElementById('copyAlert');
    copyAlert.classList.add('show');
    
    // 2秒后隐藏提示
    setTimeout(() => {
        copyAlert.classList.remove('show');
    }, 2000);
}
