
      document.getElementById("current-year").textContent =
        new Date().getFullYear();

      // كود التحكم في القوائم المنبثقة
      document.addEventListener("click", function (e) {
        // فتح / غلق
        const btn = e.target.closest("[data-toggle]");
        if (btn) {
          const targetClass = btn.getAttribute("data-toggle");
          const target = document.querySelector("." + targetClass);
          if (!target) return;
          document.querySelectorAll(".popup").forEach((p) => {
            if (p !== target) p.classList.remove("active");
          });
          target.classList.toggle("active");
        }
        // زر الإغلاق
        if (e.target.closest("[data-close]")) {
          e.target.closest(".popup").classList.remove("active");
        }
      });

      // إغلاق عند النقر خارج القائمة
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".popup") && !e.target.closest("[data-toggle]")) {
          document.querySelectorAll(".popup").forEach((p) => {
            p.classList.remove("active");
          });
        }

        if (e.target.closest(".profileList a")) {
              document.querySelector(".profileList").classList.remove("active");
            }
      });