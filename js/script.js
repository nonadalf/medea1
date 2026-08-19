// تحديث السنة التلقائي
document.getElementById("current-year").textContent = new Date().getFullYear();

// دالة للتحكم في إيقاف وإعادة تشغيل الموقع
function toggleSiteScroll() {
  // نتحقق إذا كانت هناك أي قائمة منبثقة مفتوحة
  const isAnyPopupActive = document.querySelector(".popup.active");
  if (isAnyPopupActive) {
    document.body.style.overflow = "hidden"; // إيقاف تمرير الموقع
  } else {
    document.body.style.overflow = ""; // إعادة الموقع لحالته الطبيعية
  }
}

// دمجنا كل أحداث النقر في حدث واحد ليكون الكود أنظف وأسرع
document.addEventListener("click", function (e) {
  
  // 1. فتح / غلق عبر الزر
  const btn = e.target.closest("[data-toggle]");
  if (btn) {
    const targetClass = btn.getAttribute("data-toggle");
    const target = document.querySelector("." + targetClass);
    if (!target) return;

    // إغلاق باقي القوائم المفتوحة إن وجدت
    document.querySelectorAll(".popup").forEach((p) => {
      if (p !== target) p.classList.remove("active");
    });

    // تبديل حالة القائمة المطلوبة (فتح/غلق)
    target.classList.toggle("active");
    
    // تحديث حالة إيقاف الموقع
    toggleSiteScroll();
    return; // نوقف التنفيذ هنا حتى لا تتداخل مع الشروط بالأسفل
  }

  // 2. زر الإغلاق المباشر داخل القائمة
  if (e.target.closest("[data-close]")) {
    e.target.closest(".popup").classList.remove("active");
    toggleSiteScroll(); // تحديث حالة الموقع
    return;
  }

  // 3. النقر على رابط داخل قائمة الملف الشخصي
  if (e.target.closest(".profileList a")) {
    const profileList = document.querySelector(".profileList");
    if (profileList) {
      profileList.classList.remove("active");
      toggleSiteScroll(); // تحديث حالة الموقع
    }
  }

  // 4. النقر في أي مكان فارغ (خارج القائمة والزر) لإغلاقها
  if (!e.target.closest(".popup") && !e.target.closest("[data-toggle]")) {
    let closedAny = false;
    document.querySelectorAll(".popup").forEach((p) => {
      if (p.classList.contains("active")) {
        p.classList.remove("active");
        closedAny = true; // نؤكد أنه تم إغلاق قائمة بالفعل
      }
    });
    // إذا تم إغلاق أي قائمة، نعيد الموقع للعمل
    if (closedAny) toggleSiteScroll();
  }
});
