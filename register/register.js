/**
 * Yoopedia - Register Logic (Updated with Talent Section)
 */
const steps = document.querySelectorAll(".step");
const nextButtons = document.querySelectorAll(".nextBtn:not([type='submit'])");
const prevButtons = document.querySelectorAll(".prevBtn");
const registerForm = document.getElementById("registerForm");
const progressBar = document.querySelector(".subProgress");
const currentStepNum = document.getElementById("currentStepNum");
const stepTitle = document.getElementById("stepTitle");

// عناوين الخطوات
const stepTitles = [
    "أخبرنا عنك",       // Step 1
    "إنشاء كلمة المرور", // Step 2
    "المعلومات الشخصية", // Step 3
    "أخبرنا عن موهبتك", // Step 4 (New)
    "مراجعة السياسة"     // Step 5
];

let currentStep = 0;

function showStep(index) {
    steps.forEach(s => s.classList.remove("active"));
    steps[index]?.classList.add("active");
    
    // تحديث شريط التقدم والعنوان
    const progressPercent = ((index + 1) / steps.length) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (currentStepNum) currentStepNum.textContent = index + 1;
    if (stepTitle) stepTitle.textContent = stepTitles[index] || "";
    
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function validatePassword(input) {
    const value = input?.value || "";
    const ruleLetter = document.getElementById("rule-letter");
    const ruleNumber = document.getElementById("rule-number");
    const ruleLength = document.getElementById("rule-length");
    
    if (ruleLetter) ruleLetter.checked = /[a-zA-Z]/.test(value);
    if (ruleNumber) ruleNumber.checked = /\d/.test(value);
    if (ruleLength) ruleLength.checked = value.length >= 10;
    
    return (ruleLetter?.checked && ruleNumber?.checked && ruleLength?.checked);
}

function validateStep(stepIndex) {
    const currentStepElement = steps[stepIndex];
    if (!currentStepElement) return true;
    
    let valid = true;
    
    // التحقق من حقل البريد في الخطوة الأولى
    if (stepIndex === 0) {
        const emailInput = document.getElementById("email");
        if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
            emailInput?.classList.add("input-error");
            const errorMsg = emailInput?.parentElement?.querySelector(".error-msg");
            if (errorMsg) errorMsg.style.display = "block";
            valid = false;
        } else {
            emailInput?.classList.remove("input-error");
            const errorMsg = emailInput?.parentElement?.querySelector(".error-msg");
            if (errorMsg) errorMsg.style.display = "none";
        }
        return valid;
    }
    
    // التحقق من كلمة المرور في الخطوة الثانية
    if (stepIndex === 1) {
        const passwordInput = document.getElementById("password");
        if (!validatePassword(passwordInput)) {
            passwordInput?.classList.add("input-error");
            valid = false;
        } else {
            passwordInput?.classList.remove("input-error");
        }
        return valid;
    }
    
    // التحقق من الحقول الإجبارية في الخطوات الأخرى
    const requiredInputs = currentStepElement.querySelectorAll("input[required], select[required], textarea[required]");
    requiredInputs.forEach(input => {
        if (!input.value || !input.value.trim()) {
            input.classList.add("input-error");
            valid = false;
        } else {
            input.classList.remove("input-error");
        }
    });
    
    return valid;
}

// أزرار التالي
nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });
});

// أزرار السابق
prevButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});

// خيارات الجنس (Radio Buttons)
document.querySelectorAll(".single-choice[type='radio']").forEach(rb => {
    rb.addEventListener("change", (e) => {
        if (e.target.checked) {
            document.querySelectorAll(`input[name="${e.target.name}"]`).forEach(other => {
                if (other !== e.target) other.checked = false;
            });
        }
    });
});

// إظهار/إخفاء كلمة المرور
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
passwordInput?.addEventListener("input", () => validatePassword(passwordInput));
togglePassword?.addEventListener("click", () => {
    const icon = togglePassword.querySelector("i");
    if (passwordInput?.type === "password") {
        passwordInput.type = "text";
        icon?.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon?.classList.replace("fa-eye-slash", "fa-eye");
    }
});

// إرسال النموذج
registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    const userData = {
        email: document.getElementById("email")?.value || "",
        password: document.getElementById("password")?.value || "",
        name: document.getElementById("name")?.value || "",
        birthDate: `${document.getElementById("day")?.value || ""}/${document.getElementById("months")?.value || ""}/${document.getElementById("year")?.value || ""}`,
        gender: Array.from(document.querySelectorAll('input[name="gender"]')).find(rb => rb.checked)?.value || "Not specified",
        municipality: document.getElementById("municipality")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        socialLinks: document.getElementById("socialLinks")?.value || "",
        talentName: document.getElementById("talentName")?.value || "",
        talentCategory: document.getElementById("talentCategory")?.value || "",
        talentDesc: document.getElementById("talentDesc")?.value || ""
    };
    
    console.log("تم تجميع البيانات بنجاح:", userData);
    alert("تم تسجيل البيانات بنجاح! مرحباً بك في منصة مواهب المدية.");
    window.location.href = "../../index/index.html";
});

// التهيئة الأولية
showStep(0);