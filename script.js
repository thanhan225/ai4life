// Cấu hình AI API
const AI_CONFIG = {
    apiKey: "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",
    apiUrl: "https://openrouter.ai/api/v1/chat/completions",
    model: "google/gemma-3-27b-it:free"
};

// Fallback responses khi API không hoạt động
const FALLBACK_RESPONSES = {
    "bạn có thể làm gì": "Tôi là AI tư vấn viên của FPT Polytechnic! Tôi có thể:\n\n• **Tư vấn ngành học** phù hợp với sở thích và khả năng của bạn\n• **Giải thích chi tiết** về các ngành học tại FPT Polytechnic\n• **Hướng dẫn** quy trình đăng ký và học tập\n• **Trả lời câu hỏi** về chương trình đào tạo\n\nBạn quan tâm đến lĩnh vực nào? Tôi sẽ giúp bạn tìm hiểu!",
    "công nghệ thông tin": "**Ngành Công nghệ thông tin** tại FPT Polytechnic:\n\n• **Thời gian đào tạo:** 2.5 năm (5 học kỳ)\n• **Chuyên ngành:** Lập trình ứng dụng, Phát triển web, Mobile app\n• **Cơ hội việc làm:** Lập trình viên, Developer, IT Support\n• **Mức lương:** 8-15 triệu VNĐ/tháng\n\nBạn có muốn tìm hiểu thêm về ngành này không?",
    "thiết kế đồ họa": "**Ngành Thiết kế đồ họa** tại FPT Polytechnic:\n\n• **Thời gian đào tạo:** 2.5 năm (5 học kỳ)\n• **Chuyên ngành:** Thiết kế web, UI/UX, Motion graphics\n• **Cơ hội việc làm:** Designer, Creative Director, Art Director\n• **Mức lương:** 7-12 triệu VNĐ/tháng\n\nBạn có muốn tìm hiểu thêm về ngành này không?",
    "marketing": "**Ngành Marketing** tại FPT Polytechnic:\n\n• **Thời gian đào tạo:** 2.5 năm (5 học kỳ)\n• **Chuyên ngành:** Digital Marketing, Brand Management\n• **Cơ hội việc làm:** Marketing Specialist, Brand Manager\n• **Mức lương:** 6-12 triệu VNĐ/tháng\n\nBạn có muốn tìm hiểu thêm về ngành này không?",
    "quản trị kinh doanh": "**Ngành Quản trị kinh doanh** tại FPT Polytechnic:\n\n• **Thời gian đào tạo:** 2.5 năm (5 học kỳ)\n• **Chuyên ngành:** Quản lý dự án, Khởi nghiệp\n• **Cơ hội việc làm:** Business Analyst, Project Manager\n• **Mức lương:** 7-15 triệu VNĐ/tháng\n\nBạn có muốn tìm hiểu thêm về ngành này không?",
    "học phí": "**Học phí FPT Polytechnic:**\n\n• **Học phí:** ~15-20 triệu VNĐ/năm\n• **Học bổng:** Có nhiều chương trình học bổng\n• **Thanh toán:** Theo học kỳ hoặc năm\n• **Hỗ trợ:** Có chương trình vay vốn học tập\n\nBạn có muốn tìm hiểu thêm về học phí không?",
    "tuyển sinh": "**Thông tin tuyển sinh FPT Polytechnic:**\n\n• **Phương thức xét tuyển:** Xét học bạ THPT\n• **Thời gian nhận hồ sơ:** Tháng 3-8 hàng năm\n• **Yêu cầu:** Tốt nghiệp THPT\n• **Hồ sơ cần thiết:** Bằng tốt nghiệp, học bạ, CMND\n\nBạn có muốn tìm hiểu thêm về quy trình tuyển sinh không?",
    "default": "Xin chào! Tôi là AI tư vấn viên của FPT Polytechnic. Tôi có thể giúp bạn:\n\n• Tìm hiểu về các ngành học\n• Tư vấn chọn ngành phù hợp\n• Giải đáp thắc mắc về trường\n\nBạn muốn biết thêm thông tin gì?"
};

// Dữ liệu ngành học FPT Polytechnic
let MAJORS_DATA = {};

// Load dữ liệu ngành học từ JSON
async function loadMajorsData() {
    try {
        // Thử load từ localhost server trước (để tránh CORS)
        const response = await fetch('http://localhost:8000/majors_curriculum.json');
        const data = await response.json();
        MAJORS_DATA = data;
        console.log('Loaded majors data from localhost server');
    } catch (error) {
        console.warn('Không thể load từ localhost, thử load trực tiếp file...');
        try {
            const response = await fetch('majors_curriculum.json');
            const data = await response.json();
            MAJORS_DATA = data;
            console.log('Loaded majors data from direct file');
        } catch (error) {
            console.warn('Không thể load dữ liệu ngành học, sử dụng dữ liệu mặc định');
            // Fallback data với cấu trúc đầy đủ
            MAJORS_DATA = {
                majors: [
                    {
                        name: "Công nghệ thông tin",
                        code: "CNTT",
                        skills: [
                            "Lập trình và phát triển phần mềm",
                            "Tư duy logic và phân tích",
                            "Kỹ năng giao tiếp",
                            "Làm việc nhóm",
                            "Sáng tạo và đổi mới"
                        ],
                        curriculum: {
                            ky1: [
                                { name: "Toán học cơ bản", credits: 3 },
                                { name: "Lập trình cơ bản", credits: 4 },
                                { name: "Tiếng Anh 1", credits: 2 }
                            ],
                            ky2: [
                                { name: "Cơ sở dữ liệu", credits: 3 },
                                { name: "Lập trình hướng đối tượng", credits: 4 },
                                { name: "Tiếng Anh 2", credits: 2 }
                            ],
                            ky3: [
                                { name: "Phát triển web", credits: 4 },
                                { name: "Mạng máy tính", credits: 3 },
                                { name: "Tiếng Anh 3", credits: 2 }
                            ],
                            ky4: [
                                { name: "Phát triển ứng dụng di động", credits: 4 },
                                { name: "Bảo mật thông tin", credits: 3 },
                                { name: "Tiếng Anh 4", credits: 2 }
                            ],
                            ky5: [
                                { name: "Dự án tốt nghiệp", credits: 6 },
                                { name: "Thực tập doanh nghiệp", credits: 4 }
                            ]
                        }
                    },
                    {
                        name: "Thiết kế đồ họa",
                        code: "TKDH",
                        skills: [
                            "Thiết kế visual và digital art",
                            "Sáng tạo và thẩm mỹ",
                            "Kỹ năng giao tiếp",
                            "Làm việc nhóm",
                            "Thích ứng với công nghệ mới"
                        ],
                        curriculum: {
                            ky1: [
                                { name: "Nguyên lý thiết kế", credits: 3 },
                                { name: "Đồ họa cơ bản", credits: 4 },
                                { name: "Tiếng Anh 1", credits: 2 }
                            ],
                            ky2: [
                                { name: "Thiết kế logo và brand", credits: 3 },
                                { name: "Photoshop nâng cao", credits: 4 },
                                { name: "Tiếng Anh 2", credits: 2 }
                            ],
                            ky3: [
                                { name: "Thiết kế web", credits: 4 },
                                { name: "UI/UX Design", credits: 3 },
                                { name: "Tiếng Anh 3", credits: 2 }
                            ],
                            ky4: [
                                { name: "Motion graphics", credits: 4 },
                                { name: "InDesign", credits: 3 },
                                { name: "Tiếng Anh 4", credits: 2 }
                            ],
                            ky5: [
                                { name: "Dự án tốt nghiệp", credits: 6 },
                                { name: "Thực tập doanh nghiệp", credits: 4 }
                            ]
                        }
                    },
                    {
                        name: "Quản trị kinh doanh",
                        code: "QTKD",
                        skills: [
                            "Quản lý và lãnh đạo",
                            "Tư duy chiến lược",
                            "Kỹ năng giao tiếp",
                            "Làm việc nhóm",
                            "Phân tích thị trường"
                        ],
                        curriculum: {
                            ky1: [
                                { name: "Nguyên lý quản trị", credits: 3 },
                                { name: "Marketing cơ bản", credits: 4 },
                                { name: "Tiếng Anh 1", credits: 2 }
                            ],
                            ky2: [
                                { name: "Quản lý nhân sự", credits: 3 },
                                { name: "Tài chính doanh nghiệp", credits: 4 },
                                { name: "Tiếng Anh 2", credits: 2 }
                            ],
                            ky3: [
                                { name: "Quản lý dự án", credits: 4 },
                                { name: "Thương mại điện tử", credits: 3 },
                                { name: "Tiếng Anh 3", credits: 2 }
                            ],
                            ky4: [
                                { name: "Chiến lược kinh doanh", credits: 4 },
                                { name: "Khởi nghiệp", credits: 3 },
                                { name: "Tiếng Anh 4", credits: 2 }
                            ],
                            ky5: [
                                { name: "Dự án tốt nghiệp", credits: 6 },
                                { name: "Thực tập doanh nghiệp", credits: 4 }
                            ]
                        }
                    },
                    {
                        name: "Marketing",
                        code: "MKT",
                        skills: [
                            "Chiến lược marketing",
                            "Sáng tạo và đổi mới",
                            "Kỹ năng giao tiếp",
                            "Phân tích dữ liệu",
                            "Thích ứng với xu hướng"
                        ],
                        curriculum: {
                            ky1: [
                                { name: "Nguyên lý marketing", credits: 3 },
                                { name: "Nghiên cứu thị trường", credits: 4 },
                                { name: "Tiếng Anh 1", credits: 2 }
                            ],
                            ky2: [
                                { name: "Marketing mix", credits: 3 },
                                { name: "Digital marketing", credits: 4 },
                                { name: "Tiếng Anh 2", credits: 2 }
                            ],
                            ky3: [
                                { name: "Content marketing", credits: 4 },
                                { name: "Social media marketing", credits: 3 },
                                { name: "Tiếng Anh 3", credits: 2 }
                            ],
                            ky4: [
                                { name: "Brand management", credits: 4 },
                                { name: "Marketing analytics", credits: 3 },
                                { name: "Tiếng Anh 4", credits: 2 }
                            ],
                            ky5: [
                                { name: "Dự án tốt nghiệp", credits: 6 },
                                { name: "Thực tập doanh nghiệp", credits: 4 }
                            ]
                        }
                    }
                ]
            };
        }
    }
}

// Lưu trữ dữ liệu
let consultationHistory = JSON.parse(localStorage.getItem('consultationHistory') || '[]');
let skillChart = null;


// Chat functionality
let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
let isTyping = false;
let currentStreamingMessage = null;

// Multi-page functionality
function initializeMultiPage() {
    console.log('initializeMultiPage called');
    setupNavigation();
    setupMobileMenu();
    setupPageSpecificFeatures();
    console.log('initializeMultiPage completed');
}

function setupNavigation() {
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function setupPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('setupPageSpecificFeatures called, current page:', currentPage);
    
    switch (currentPage) {
        case 'majors.html':
            console.log('Setting up majors page...');
            setupMajorsPage();
            break;
        case 'results.html':
            console.log('Setting up results page...');
            setupResultsPage();
            break;
        case 'chat.html':
            console.log('Setting up chat page...');
            setupChatPage();
            break;
        case 'consultation.html':
            console.log('Setting up consultation page...');
            setupConsultationPage();
            break;
        case 'about.html':
            console.log('Setting up about page...');
            setupAboutPage();
            break;
        default:
            console.log('Setting up home page...');
            setupHomePage();
            break;
    }
}

function setupHomePage() {
    // Add any home page specific functionality
    console.log('Home page loaded');
}

function setupMajorsPage() {
    loadMajorsData().then(() => {
        displayMajors();
        setupMajorsSearch();
        setupMajorsFilter();
        setupMajorModal();
    });
}

function setupResultsPage() {
    console.log('setupResultsPage called');
    // Load consultation history and ensure data is ready before displaying
    loadConsultationHistory();
    
    // Use setTimeout to ensure data is loaded before displaying
    setTimeout(() => {
        console.log('setupResultsPage timeout executed');
        displayResultsStatistics();
        displayPopularMajorsChart();
        displayTimelineChart();
        displaySkillsChart();
        displayConsultationHistory();
    }, 100);
    
    setupExportFunctions();
    setupResultModal();
}

function setupChatPage() {
    // Load chat history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory = savedHistory;
    
    // Display saved messages
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && savedHistory.length > 0) {
        chatMessages.innerHTML = '';
        savedHistory.forEach(msg => {
            addMessageToChat(msg.sender, msg.message, false, true);
        });
    } else if (chatMessages) {
        // Add welcome message if no history
        addMessageToChat('ai', 'Xin chào! Tôi là AI tư vấn viên của FPT Polytechnic. Tôi có thể giúp bạn:\n\n• Tìm hiểu về các ngành học\n• Tư vấn chọn ngành phù hợp\n• Giải đáp thắc mắc về trường\n\nBạn muốn biết thêm thông tin gì?', false, true);
    }
    
    setupChatHandling();
}

function setupConsultationPage() {
    setupFormHandling();
    console.log('Consultation page loaded');
}

function setupAboutPage() {
    setupContactForm();
    console.log('About page loaded');
}

// Majors page functionality
function displayMajors() {
    const majorsGrid = document.getElementById('majorsGrid');
    if (!majorsGrid || !MAJORS_DATA.majors) return;

    majorsGrid.innerHTML = '';
    
    MAJORS_DATA.majors.forEach(major => {
        const majorCard = createMajorCard(major);
        majorsGrid.appendChild(majorCard);
    });
}

function createMajorCard(major) {
    const card = document.createElement('div');
    card.className = 'major-card';
    card.setAttribute('data-major', major.name.toLowerCase());
    
    const icon = getMajorIcon(major.name);
    
    card.innerHTML = `
        <div class="major-icon">
            <i class="${icon}"></i>
        </div>
        <h3>${major.name}</h3>
        <p>${getMajorDescription(major.name)}</p>
        <button class="btn btn-outline" onclick="openMajorModal('${major.name}')">
            <i class="fas fa-info-circle"></i> Chi tiết
        </button>
    `;
    
    return card;
}

function getMajorIcon(majorName) {
    const iconMap = {
        'Công nghệ thông tin': 'fas fa-code',
        'Kỹ thuật phần mềm': 'fas fa-laptop-code',
        'An toàn thông tin': 'fas fa-shield-alt',
        'Thiết kế đồ họa': 'fas fa-palette',
        'Quản trị kinh doanh': 'fas fa-briefcase',
        'Marketing': 'fas fa-chart-line',
        'Tài chính - Ngân hàng': 'fas fa-university',
        'Kế toán': 'fas fa-calculator',
        'Du lịch - Khách sạn': 'fas fa-hotel',
        'Ngôn ngữ Anh': 'fas fa-language',
        'Ngôn ngữ Nhật': 'fas fa-language',
        'Ngôn ngữ Hàn Quốc': 'fas fa-language',
        'Công nghệ thực phẩm': 'fas fa-utensils',
        'Công nghệ sinh học': 'fas fa-dna',
        'Điện tử - Viễn thông': 'fas fa-satellite-dish',
        'Cơ điện tử': 'fas fa-cogs',
        'Xây dựng': 'fas fa-hammer',
        'Kiến trúc': 'fas fa-drafting-compass'
    };
    
    return iconMap[majorName] || 'fas fa-graduation-cap';
}

function getMajorDescription(majorName) {
    const descriptions = {
        'Công nghệ thông tin': 'Phát triển ứng dụng và hệ thống thông tin',
        'Kỹ thuật phần mềm': 'Thiết kế và phát triển phần mềm chất lượng cao',
        'An toàn thông tin': 'Bảo vệ hệ thống và dữ liệu khỏi các mối đe dọa',
        'Thiết kế đồ họa': 'Sáng tạo thiết kế visual và digital art',
        'Quản trị kinh doanh': 'Quản lý và phát triển doanh nghiệp',
        'Marketing': 'Chiến lược marketing trong thời đại số',
        'Tài chính - Ngân hàng': 'Quản lý tài chính và hoạt động ngân hàng',
        'Kế toán': 'Quản lý tài chính và báo cáo kế toán',
        'Du lịch - Khách sạn': 'Quản lý dịch vụ du lịch và khách sạn',
        'Ngôn ngữ Anh': 'Thành thạo tiếng Anh và văn hóa quốc tế',
        'Ngôn ngữ Nhật': 'Thành thạo tiếng Nhật và văn hóa Nhật Bản',
        'Ngôn ngữ Hàn Quốc': 'Thành thạo tiếng Hàn và văn hóa Hàn Quốc',
        'Công nghệ thực phẩm': 'Công nghệ chế biến và bảo quản thực phẩm',
        'Công nghệ sinh học': 'Ứng dụng công nghệ sinh học trong thực tế',
        'Điện tử - Viễn thông': 'Thiết kế và vận hành hệ thống viễn thông',
        'Cơ điện tử': 'Tích hợp cơ khí, điện tử và điều khiển',
        'Xây dựng': 'Thiết kế và thi công công trình xây dựng',
        'Kiến trúc': 'Thiết kế kiến trúc và quy hoạch đô thị'
    };
    
    return descriptions[majorName] || 'Chương trình đào tạo chất lượng cao';
}

function setupMajorsSearch() {
    const searchInput = document.getElementById('majorSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const majorCards = document.querySelectorAll('.major-card');
        
        majorCards.forEach(card => {
            const majorName = card.querySelector('h3').textContent.toLowerCase();
            const majorDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (majorName.includes(searchTerm) || majorDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function setupMajorsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterMajors(filter);
        });
    });
}

function filterMajors(filter) {
    const majorCards = document.querySelectorAll('.major-card');
    
    majorCards.forEach(card => {
        const majorName = card.querySelector('h3').textContent.toLowerCase();
        
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            // Simple filtering logic - can be enhanced
            const categoryMap = {
                'technology': ['công nghệ', 'kỹ thuật', 'an toàn', 'điện tử', 'cơ điện tử'],
                'business': ['quản trị', 'marketing', 'tài chính', 'kế toán'],
                'design': ['thiết kế', 'kiến trúc'],
                'marketing': ['marketing']
            };
            
            const categories = categoryMap[filter] || [];
            const matches = categories.some(cat => majorName.includes(cat));
            
            card.style.display = matches ? 'block' : 'none';
        }
    });
}

function setupMajorModal() {
    const modal = document.getElementById('majorModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

function openMajorModal(majorName) {
    const modal = document.getElementById('majorModal');
    const modalTitle = document.getElementById('modalTitle');
    const majorCode = document.getElementById('majorCode');
    const skillsList = document.getElementById('skillsList');
    const curriculumContent = document.getElementById('curriculumContent');
    
    if (!modal) return;
    
    // Set modal title
    modalTitle.textContent = majorName;
    majorCode.textContent = getMajorCode(majorName);
    
    // Load major data
    const major = MAJORS_DATA.majors.find(m => m.name === majorName);
    if (major) {
        displayMajorSkills(skillsList, major);
        displayMajorCurriculum(curriculumContent, major);
    }
    
    // Setup curriculum tabs
    setupCurriculumTabs();
    
    modal.classList.add('show');
}

function getMajorCode(majorName) {
    const major = MAJORS_DATA.majors.find(m => m.name === majorName);
    return major ? major.code : 'N/A';
}

function displayMajorSkills(skillsList, major) {
    if (!skillsList) return;
    
    const skills = major.skills || [
        'Tư duy logic và phân tích',
        'Kỹ năng giao tiếp',
        'Làm việc nhóm',
        'Sáng tạo và đổi mới',
        'Thích ứng với công nghệ mới'
    ];
    
    skillsList.innerHTML = skills.map(skill => 
        `<div class="skill-item"><i class="fas fa-check"></i> ${skill}</div>`
    ).join('');
}

function displayMajorCurriculum(curriculumContent, major) {
    if (!curriculumContent) return;
    
    const curriculum = major.curriculum || {};
    const semesters = ['ky1', 'ky2', 'ky3', 'ky4', 'ky5', 'ky6'];
    
    let html = '';
    semesters.forEach(semester => {
        const subjects = curriculum[semester] || [];
        if (subjects.length > 0) {
            html += `
                <div class="semester-content" data-semester="${semester}">
                    <h4>Học kỳ ${semester.replace('ky', '')}</h4>
                    <div class="subjects-list">
                        ${subjects.map(subject => `
                            <div class="subject-item">
                                <span class="subject-code">${subject.code}</span>
                                <span class="subject-name">${subject.name}</span>
                                <span class="subject-credits">${subject.credits} tín chỉ</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    curriculumContent.innerHTML = html;
}

function setupCurriculumTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const semesterContents = document.querySelectorAll('.semester-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const semester = this.getAttribute('data-semester');
            
            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            semesterContents.forEach(content => {
                content.style.display = content.getAttribute('data-semester') === semester ? 'block' : 'none';
            });
        });
    });
}

// Results page functionality
function displayResultsStatistics() {
    console.log('displayResultsStatistics called');
    console.log('Consultation history length:', consultationHistory.length);
    
    const totalConsultations = document.getElementById('totalConsultations');
    const totalMajors = document.getElementById('totalMajors');
    const thisMonth = document.getElementById('thisMonth');
    const avgRating = document.getElementById('avgRating');
    
    console.log('Elements found:', {
        totalConsultations: !!totalConsultations,
        totalMajors: !!totalMajors,
        thisMonth: !!thisMonth,
        avgRating: !!avgRating
    });
    
    if (totalConsultations) {
        totalConsultations.textContent = consultationHistory.length;
        console.log('Updated totalConsultations:', consultationHistory.length);
    }
    if (totalMajors) {
        const majorsCount = getUniqueMajorsCount();
        totalMajors.textContent = majorsCount;
        console.log('Updated totalMajors:', majorsCount);
    }
    if (thisMonth) {
        const monthCount = getThisMonthConsultations();
        thisMonth.textContent = monthCount;
        console.log('Updated thisMonth:', monthCount);
    }
    if (avgRating) {
        const avg = getAverageRating();
        avgRating.textContent = avg;
        console.log('Updated avgRating:', avg);
    }
}

function getUniqueMajorsCount() {
    const majors = new Set();
    consultationHistory.forEach(consultation => {
        if (consultation.recommendedMajor) {
            majors.add(consultation.recommendedMajor);
        }
    });
    return majors.size;
}

function getThisMonthConsultations() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return consultationHistory.filter(consultation => {
        const consultationDate = new Date(consultation.date);
        return consultationDate.getMonth() === currentMonth && 
               consultationDate.getFullYear() === currentYear;
    }).length;
}

function getAverageRating() {
    const ratings = consultationHistory
        .filter(consultation => consultation.rating)
        .map(consultation => consultation.rating);
    
    if (ratings.length === 0) return '0';
    
    const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    return average.toFixed(1);
}

function displayPopularMajorsChart() {
    console.log('displayPopularMajorsChart called');
    const ctx = document.getElementById('popularMajorsChart');
    if (!ctx) {
        console.log('popularMajorsChart element not found');
        return;
    }
    console.log('popularMajorsChart element found, creating chart...');
    console.log('consultationHistory length:', consultationHistory.length);
    
    const majorCounts = {};
    consultationHistory.forEach(consultation => {
        if (consultation.recommendedMajor) {
            majorCounts[consultation.recommendedMajor] = 
                (majorCounts[consultation.recommendedMajor] || 0) + 1;
        }
    });
    
    console.log('Major counts for chart:', majorCounts);
    
    const labels = Object.keys(majorCounts);
    const data = Object.values(majorCounts);
    
    console.log('Chart labels:', labels);
    console.log('Chart data:', data);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#f5576c',
                    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                    '#fa709a', '#fee140', '#a8edea', '#fed6e3'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function displayTimelineChart() {
    console.log('displayTimelineChart called');
    const ctx = document.getElementById('timelineChart');
    if (!ctx) {
        console.log('timelineChart element not found');
        return;
    }
    console.log('timelineChart element found, creating chart...');
    
    // Tạo dữ liệu timeline cho 6 tháng gần đây
    const months = [];
    const consultationCounts = [];
    const currentDate = new Date();
    
    console.log('Creating timeline data for 6 months...');
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('vi-VN', { month: 'short' });
        months.push(monthName);
        
        // Đếm số lần tư vấn trong tháng đó
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const count = consultationHistory.filter(consultation => {
            const consultationDate = new Date(consultation.date);
            return consultationDate >= monthStart && consultationDate <= monthEnd;
        }).length;
        
        consultationCounts.push(count);
    }
    
    console.log('Timeline months:', months);
    console.log('Timeline counts:', consultationCounts);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Số lần tư vấn',
                data: consultationCounts,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        stepSize: 1,
                        color: '#666'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#666'
                    }
                }
            }
        }
    });
}

function displaySkillsChart() {
    console.log('displaySkillsChart called');
    const ctx = document.getElementById('skillsChart');
    if (!ctx) {
        console.log('skillsChart element not found');
        return;
    }
    console.log('skillsChart element found, creating chart...');
    
    // Tạo dữ liệu kỹ năng phổ biến
    const skillsData = {
        'Lập trình': 85,
        'Thiết kế': 72,
        'Quản lý dự án': 68,
        'Giao tiếp': 91,
        'Làm việc nhóm': 88,
        'Sáng tạo': 76,
        'Phân tích': 82,
        'Tiếng Anh': 79,
        'Marketing': 65,
        'Kinh doanh': 70
    };
    
    console.log('Skills data:', skillsData);
    
    const labels = Object.keys(skillsData);
    const data = Object.values(skillsData);
    
    console.log('Skills labels:', labels);
    console.log('Skills data values:', data);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Độ phổ biến (%)',
                data: data,
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#f5576c',
                    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                    '#fa709a', '#fee140'
                ],
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#667eea',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Độ phổ biến: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        stepSize: 20,
                        color: '#666',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        maxRotation: 45
                    }
                }
            }
        }
    });
}

function displayConsultationHistory() {
    console.log('displayConsultationHistory called');
    const historyList = document.getElementById('historyList');
    if (!historyList) {
        console.log('historyList element not found');
        return;
    }
    console.log('historyList element found, displaying history...');
    console.log('Consultation history length:', consultationHistory.length);
    
    historyList.innerHTML = '';
    
    consultationHistory.forEach((consultation, index) => {
        const historyItem = createHistoryItem(consultation, index);
        historyList.appendChild(historyItem);
    });
    
    console.log('Consultation history displayed successfully');
}

function createHistoryItem(consultation, index) {
    const item = document.createElement('div');
    item.className = 'history-item';
    
    item.innerHTML = `
        <div class="history-content">
            <div class="history-info">
                <h3>${consultation.name}</h3>
                <p><strong>Ngành được tư vấn:</strong> ${consultation.recommendedMajor || 'N/A'}</p>
                <p><strong>Ngày tư vấn:</strong> ${new Date(consultation.date).toLocaleDateString('vi-VN')}</p>
            </div>
            <div class="history-actions">
                <button class="btn btn-outline" onclick="viewResultDetail(${index})">
                    <i class="fas fa-eye"></i> Xem chi tiết
                </button>
                <button class="btn btn-secondary" onclick="deleteConsultation(${index})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `;
    
    return item;
}

function setupExportFunctions() {
    const exportPDF = document.getElementById('exportPDF');
    const exportExcel = document.getElementById('exportExcel');
    const clearHistory = document.getElementById('clearHistory');
    
    if (exportPDF) {
        exportPDF.addEventListener('click', exportToPDF);
    }
    
    if (exportExcel) {
        exportExcel.addEventListener('click', exportToExcel);
    }
    
    if (clearHistory) {
        clearHistory.addEventListener('click', clearConsultationHistory);
    }
}

function exportToPDF() {
    // Implementation for PDF export
    alert('Tính năng xuất PDF sẽ được phát triển trong phiên bản tiếp theo');
}

function exportToExcel() {
    // Implementation for Excel export
    alert('Tính năng xuất Excel sẽ được phát triển trong phiên bản tiếp theo');
}

function clearConsultationHistory() {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử tư vấn?')) {
        consultationHistory = [];
        localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
        displayResultsStatistics();
        displayConsultationHistory();
        alert('Đã xóa toàn bộ lịch sử tư vấn');
    }
}

function setupResultModal() {
    const modal = document.getElementById('resultModal');
    const closeBtn = document.getElementById('closeResultModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

function viewResultDetail(index) {
    const consultation = consultationHistory[index];
    if (!consultation) return;
    
    const modal = document.getElementById('resultModal');
    const detailName = document.getElementById('detailName');
    const detailDate = document.getElementById('detailDate');
    const detailInterests = document.getElementById('detailInterests');
    const detailSkills = document.getElementById('detailSkills');
    const detailRecommendation = document.getElementById('detailRecommendation');
    
    if (detailName) detailName.textContent = consultation.name;
    if (detailDate) detailDate.textContent = new Date(consultation.date).toLocaleDateString('vi-VN');
    if (detailInterests) detailInterests.textContent = consultation.interests || 'N/A';
    if (detailSkills) detailSkills.textContent = consultation.skills || 'N/A';
    if (detailRecommendation) detailRecommendation.innerHTML = consultation.aiResponse || 'N/A';
    
    // Create skill chart for this consultation
    createDetailSkillChart(consultation);
    
    modal.classList.add('show');
}

function createDetailSkillChart(consultation) {
    const ctx = document.getElementById('detailSkillChart');
    if (!ctx) return;
    
    const skillData = {
        'Yêu thích công nghệ': consultation.techInterest || 3,
        'Khả năng sáng tạo': consultation.creativity || 3,
        'Kỹ năng giao tiếp': consultation.communication || 3,
        'Tư duy logic': consultation.logic || 3
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(skillData),
            datasets: [{
                label: 'Kỹ năng cá nhân',
                data: Object.values(skillData),
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: '#667eea',
                borderWidth: 2,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function deleteConsultation(index) {
    if (confirm('Bạn có chắc chắn muốn xóa kết quả tư vấn này?')) {
        consultationHistory.splice(index, 1);
        localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
        displayResultsStatistics();
        displayConsultationHistory();
        alert('Đã xóa kết quả tư vấn');
    }
}

// About page functionality
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const subject = formData.get('subject') || this.querySelectorAll('input[type="text"]')[1].value;
        const message = formData.get('message') || this.querySelector('textarea').value;
        
        // Simulate form submission
        alert(`Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.\n\nThông tin đã gửi:\nTên: ${name}\nEmail: ${email}\nTiêu đề: ${subject}`);
        
        // Reset form
        this.reset();
    });
}

// Chat functionality
function setupChatHandling() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const resetButton = document.getElementById('resetChat');
    
    // Check if elements exist (for non-chat pages)
    if (!chatInput || !sendButton) {
        return;
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendChatMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Auto-resize input and enable/disable send button
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        
        // Enable/disable send button
        sendButton.disabled = !this.value.trim();
    });

    // Reset chat button
    if (resetButton) {
        resetButton.addEventListener('click', resetChatHistory);
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    document.getElementById('sendMessage').disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate AI response with streaming
    generateStreamingAIResponse(message);
}

function addStreamingContent(content) {
    if (currentStreamingMessage) {
        const textDiv = currentStreamingMessage.querySelector('.message-text');
        if (textDiv) {
            // Render markdown for streaming content
            textDiv.innerHTML = marked.parse(content);
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator-container';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    isTyping = true;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// Gọi AI API cho chat
async function callAIAPI(prompt) {
    try {
        // Lấy 10 tin nhắn cuối cùng từ chatHistory để làm context
        const recentMessages = chatHistory.slice(-10);
        const contextMessages = recentMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.message
        }));

        // Tạo danh sách ngành học từ MAJORS_DATA
        const majorsList = MAJORS_DATA.majors ? 
            MAJORS_DATA.majors.map(m => m.name).join(', ') : 
            'Công nghệ thông tin, Kỹ thuật phần mềm, An toàn thông tin, Thiết kế đồ họa, Quản trị kinh doanh, Marketing, Tài chính - Ngân hàng, Kế toán, Du lịch - Khách sạn, Ngôn ngữ Anh, Ngôn ngữ Nhật, Ngôn ngữ Hàn Quốc, Công nghệ thực phẩm, Công nghệ sinh học, Điện tử - Viễn thông, Cơ điện tử, Xây dựng, Kiến trúc';

        const response = await fetch(AI_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    {
                        role: "system",
                        content: `Bạn là AI tư vấn viên của FPT Polytechnic. Hãy trả lời các câu hỏi của học sinh một cách thân thiện và hữu ích.

THÔNG TIN VỀ FPT POLYTECHNIC:
- Trường Cao đẳng FPT Polytechnic thuộc Tập đoàn FPT
- Chuyên đào tạo các ngành công nghệ, kinh doanh, thiết kế
- Thời gian đào tạo: 2.5 năm (5 học kỳ)
- Học phí: ~15-20 triệu VNĐ/năm
- Có nhiều chương trình học bổng và hỗ trợ

DANH SÁCH NGÀNH HỌC: ${majorsList}

QUY TẮC TRẢ LỜI:
1. Trả lời trực tiếp câu hỏi, không chào hỏi lại nếu đã có context
2. Sử dụng markdown để format text đẹp mắt
3. Nhớ context của cuộc trò chuyện
4. Không spam câu trả lời có sẵn
5. Nếu hỏi về ngành cụ thể, giải thích chi tiết về ngành đó
6. Khuyến khích điền form để tư vấn chi tiết hơn`
                    },
                    ...contextMessages,
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI API Error:', error);
        return "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc sử dụng form tư vấn.";
    }
}

async function generateStreamingAIResponse(userMessage) {
    try {
        // Create streaming message
        addMessageToChat('ai', '', true);
        hideTypingIndicator();
        
        // Simulate streaming response
        const response = await callAIAPI(userMessage);
        let currentText = '';
        const words = response.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + ' ';
            addStreamingContent(currentText.trim());
            await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay between words
        }
        
        // Finalize streaming message
        if (currentStreamingMessage) {
            currentStreamingMessage.id = '';
            currentStreamingMessage = null;
        }
    } catch (error) {
        console.error('Chat AI Error:', error);
        hideTypingIndicator();
        addMessageToChat('ai', 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau hoặc sử dụng form tư vấn bên trái.');
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        addFileMessage('user', file);
        // Process file with AI
        processFileWithAI(file);
    }
    event.target.value = ''; // Reset input
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        addImageMessage('user', file);
        // Process image with AI
        processImageWithAI(file);
    }
    event.target.value = ''; // Reset input
}

function addFileMessage(sender, file) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const header = document.createElement('div');
    header.className = 'message-header';
    
    const senderName = document.createElement('span');
    senderName.className = 'sender-name';
    senderName.textContent = sender === 'user' ? 'Bạn' : 'AI Tư Vấn';
    
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();
    
    const fileDiv = document.createElement('div');
    fileDiv.className = 'message-file';
    
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    
    const fileIcon = document.createElement('div');
    fileIcon.className = 'file-icon';
    fileIcon.innerHTML = '<i class="fas fa-file"></i>';
    
    const fileDetails = document.createElement('div');
    fileDetails.className = 'file-details';
    
    const fileName = document.createElement('div');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    const fileSize = document.createElement('div');
    fileSize.className = 'file-size';
    fileSize.textContent = formatFileSize(file.size);
    
    fileDetails.appendChild(fileName);
    fileDetails.appendChild(fileSize);
    fileInfo.appendChild(fileIcon);
    fileInfo.appendChild(fileDetails);
    fileDiv.appendChild(fileInfo);
    
    header.appendChild(senderName);
    header.appendChild(messageTime);
    content.appendChild(header);
    content.appendChild(fileDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addImageMessage(sender, file) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const header = document.createElement('div');
    header.className = 'message-header';
    
    const senderName = document.createElement('span');
    senderName.className = 'sender-name';
    senderName.textContent = sender === 'user' ? 'Bạn' : 'AI Tư Vấn';
    
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();
    
    const imageDiv = document.createElement('div');
    imageDiv.style.marginTop = '8px';
    
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = '200px';
    img.style.maxHeight = '200px';
    img.style.borderRadius = '8px';
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', () => {
        // Open image in new tab
        window.open(img.src, '_blank');
    });
    
    imageDiv.appendChild(img);
    
    header.appendChild(senderName);
    header.appendChild(messageTime);
    content.appendChild(header);
    content.appendChild(imageDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function processFileWithAI(file) {
    try {
        showTypingIndicator();
        
        // Simulate AI processing file
        setTimeout(() => {
            hideTypingIndicator();
            addMessageToChat('ai', `Tôi đã nhận được file **${file.name}** của bạn. Đây là một file ${file.type || 'không xác định'}. Bạn có muốn tôi phân tích nội dung file này để tư vấn ngành học phù hợp không?`);
        }, 2000);
    } catch (error) {
        console.error('File processing error:', error);
        hideTypingIndicator();
        addMessageToChat('ai', 'Xin lỗi, tôi không thể xử lý file này. Vui lòng thử lại với file khác.');
    }
}

async function processImageWithAI(file) {
    try {
        showTypingIndicator();
        
        // Simulate AI processing image
        setTimeout(() => {
            hideTypingIndicator();
            addMessageToChat('ai', `Tôi đã nhận được ảnh của bạn. Đây là một ảnh ${file.type.split('/')[1].toUpperCase()}. Bạn có muốn tôi phân tích ảnh này để tư vấn ngành học phù hợp không?`);
        }, 2000);
    } catch (error) {
        console.error('Image processing error:', error);
        hideTypingIndicator();
        addMessageToChat('ai', 'Xin lỗi, tôi không thể xử lý ảnh này. Vui lòng thử lại với ảnh khác.');
    }
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createChatPrompt(userMessage) {
    const majorsList = MAJORS_DATA.majors ? MAJORS_DATA.majors.map(m => m.name).join(', ') : 'Công nghệ thông tin, Thiết kế đồ họa, Marketing, Quản trị kinh doanh, Kế toán, Du lịch, Ngôn ngữ Anh';
    
    return `Bạn là AI tư vấn viên của FPT Polytechnic. Hãy trả lời câu hỏi của sinh viên một cách thân thiện và hữu ích.

Thông tin về các ngành học tại FPT Polytechnic: ${majorsList}

Câu hỏi của sinh viên: "${userMessage}"

Hãy trả lời bằng tiếng Việt, ngắn gọn (dưới 200 từ) và khuyến khích sinh viên điền form để nhận tư vấn chi tiết hơn. Nếu sinh viên hỏi về ngành học cụ thể, hãy giải thích về ngành đó và triển vọng nghề nghiệp. Sử dụng markdown để format text đẹp mắt.`;
}

// Thiết lập xử lý form
function setupFormHandling() {
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Xử lý submit form
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    // Hiển thị loading
    showLoading();
    
    try {
        // Gọi AI để phân tích
        const aiResponse = await analyzeWithAI(userData);
        
        // Lưu kết quả
        const result = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            userData: userData,
            aiResponse: aiResponse
        };
        
        consultationHistory.push(result);
        localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
        
        // Hiển thị kết quả
        displayResults(result);
        
        // Cập nhật thống kê
        updateStatistics();
        
    } catch (error) {
        console.error('Error:', error);
        showError('Có lỗi xảy ra khi phân tích. Vui lòng thử lại.');
    }
}

// Gọi AI API
async function analyzeWithAI(userData) {
    const prompt = createAIPrompt(userData);
    
    const response = await fetch(AI_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: [
                {
                    role: "system",
                    content: "Bạn là một chuyên gia tư vấn hướng nghiệp tại FPT Polytechnic. Hãy phân tích thông tin học sinh và đưa ra lời khuyên về ngành học phù hợp nhất."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Tạo prompt cho AI
function createAIPrompt(userData) {
    const majorsList = MAJORS_DATA.majors ? MAJORS_DATA.majors.map(m => m.name).join(', ') : 'Công nghệ thông tin, Kỹ thuật phần mềm, An toàn thông tin, Thiết kế đồ họa, Quản trị kinh doanh, Marketing, Tài chính - Ngân hàng, Kế toán, Du lịch - Khách sạn, Ngôn ngữ Anh, Ngôn ngữ Nhật, Ngôn ngữ Hàn Quốc, Công nghệ thực phẩm, Công nghệ sinh học, Điện tử - Viễn thông, Cơ điện tử, Xây dựng, Kiến trúc';
    
    return `
Hãy phân tích thông tin sau và đưa ra lời khuyên về ngành học phù hợp nhất từ danh sách ngành học của FPT Polytechnic:

THÔNG TIN HỌC SINH:
- Họ tên: ${userData.name}
- Sở thích: ${userData.interests}
- Kỹ năng/Tố chất: ${userData.skills}
- Môn học yêu thích: ${userData.favoriteSubjects}
- Định hướng nghề nghiệp: ${userData.careerOrientation}
- Thói quen học tập: ${userData.studyHabits}
- Yêu thích công nghệ: ${userData.techInterest}/5
- Khả năng sáng tạo: ${userData.creativity}/5
- Kỹ năng giao tiếp: ${userData.communication}/5
- Tư duy logic: ${userData.logic}/5

DANH SÁCH NGÀNH HỌC FPT POLYTECHNIC:
${majorsList}

Hãy trả lời theo format sau:
1. NGÀNH HỌC PHÙ HỢP NHẤT: [Tên ngành]
2. LÝ DO: [Giải thích ngắn gọn tại sao phù hợp]
3. KỸ NĂNG CẦN CẢI THIỆN: [Liệt kê 2-3 kỹ năng cần phát triển]
4. MÔN HỌC NÊN TẬP TRUNG: [Liệt kê 2-3 môn học quan trọng]
5. ĐIỂM MẠNH: [Liệt kê 2-3 điểm mạnh của học sinh]
`;
}

// Hiển thị loading
function showLoading() {
    document.getElementById('resultSection').classList.add('show');
    document.getElementById('loadingResult').style.display = 'block';
    document.getElementById('majorRecommendation').style.display = 'none';
    document.getElementById('infographic').style.display = 'none';
    document.getElementById('qrSection').style.display = 'none';
}

// Hiển thị kết quả
function displayResults(result) {
    document.getElementById('loadingResult').style.display = 'none';
    
    // Parse AI response
    const aiResponse = result.aiResponse;
    const majorMatch = aiResponse.match(/NGÀNH HỌC PHÙ HỢP NHẤT:\s*(.+)/);
    const reasonMatch = aiResponse.match(/LÝ DO:\s*(.+)/);
    const skillsMatch = aiResponse.match(/KỸ NĂNG CẦN CẢI THIỆN:\s*(.+)/);
    const subjectsMatch = aiResponse.match(/MÔN HỌC NÊN TẬP TRUNG:\s*(.+)/);
    const strengthsMatch = aiResponse.match(/ĐIỂM MẠNH:\s*(.+)/);
    
    // Hiển thị ngành học được khuyến nghị
    const recommendedMajor = majorMatch ? majorMatch[1].trim() : 'Chưa xác định';
    document.getElementById('recommendedMajor').textContent = recommendedMajor;
    document.getElementById('majorRecommendation').style.display = 'block';
    
    // Hiển thị thông tin chi tiết về ngành học
    displayMajorDetails(recommendedMajor, aiResponse);
    
    // Tạo biểu đồ kỹ năng
    createSkillChart(result.userData);
    document.getElementById('infographic').style.display = 'block';
    
    // Tạo QR code
    createQRCode(result);
    document.getElementById('qrSection').style.display = 'block';
}

// Hiển thị thông tin chi tiết về ngành học
function displayMajorDetails(majorName, aiResponse) {
    // Tìm thông tin ngành học từ JSON
    const majorInfo = MAJORS_DATA.majors ? MAJORS_DATA.majors.find(m => m.name === majorName) : null;
    
    // Parse AI response để lấy thông tin bổ sung
    const reasonMatch = aiResponse.match(/LÝ DO:\s*(.+)/);
    const skillsMatch = aiResponse.match(/KỸ NĂNG CẦN CẢI THIỆN:\s*(.+)/);
    const subjectsMatch = aiResponse.match(/MÔN HỌC NÊN TẬP TRUNG:\s*(.+)/);
    const strengthsMatch = aiResponse.match(/ĐIỂM MẠNH:\s*(.+)/);
    
    // Tạo nội dung chi tiết
    let detailsHTML = '';
    
    if (reasonMatch) {
        detailsHTML += `<p><strong>Lý do phù hợp:</strong> ${reasonMatch[1].trim()}</p>`;
    }
    
    if (skillsMatch) {
        detailsHTML += `<p><strong>Kỹ năng cần cải thiện:</strong> ${skillsMatch[1].trim()}</p>`;
    }
    
    if (subjectsMatch) {
        detailsHTML += `<p><strong>Môn học nên tập trung:</strong> ${subjectsMatch[1].trim()}</p>`;
    }
    
    if (strengthsMatch) {
        detailsHTML += `<p><strong>Điểm mạnh của bạn:</strong> ${strengthsMatch[1].trim()}</p>`;
    }
    
    // Thêm thông tin từ JSON nếu có
    if (majorInfo && majorInfo.skills) {
        detailsHTML += `<p><strong>Kỹ năng cần có:</strong></p><ul>`;
        majorInfo.skills.forEach(skill => {
            detailsHTML += `<li>${skill}</li>`;
        });
        detailsHTML += `</ul>`;
    }
    
    // Hiển thị thông tin chi tiết
    const detailsContainer = document.getElementById('majorRecommendation');
    if (detailsHTML) {
        detailsContainer.innerHTML += `<div style="margin-top: 20px; text-align: left; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">${detailsHTML}</div>`;
    }
}

// Tạo biểu đồ kỹ năng
function createSkillChart(userData) {
    const ctx = document.getElementById('skillChart').getContext('2d');
    
    if (skillChart) {
        skillChart.destroy();
    }
    
    const skills = {
        'Công nghệ': parseInt(userData.techInterest) || 0,
        'Sáng tạo': parseInt(userData.creativity) || 0,
        'Giao tiếp': parseInt(userData.communication) || 0,
        'Logic': parseInt(userData.logic) || 0
    };
    
    skillChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(skills),
            datasets: [{
                label: 'Điểm số kỹ năng',
                data: Object.values(skills),
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Tạo QR code
function createQRCode(result) {
    const qrContainer = document.getElementById('qrCode');
    const qrData = JSON.stringify({
        name: result.userData.name,
        major: result.aiResponse,
        timestamp: result.timestamp
    });
    
    // Sử dụng QR Server API để tạo QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code" style="max-width: 200px;">`;
}

// Cập nhật thống kê
function updateStatistics() {
    console.log('updateStatistics called');
    console.log('Current page:', window.location.pathname);
    console.log('consultationHistory length:', consultationHistory.length);
    
    const majorCounts = {};
    
    consultationHistory.forEach(result => {
        const aiResponse = result.aiResponse;
        const majorMatch = aiResponse.match(/NGÀNH HỌC PHÙ HỢP NHẤT:\s*(.+)/);
        if (majorMatch) {
            const major = majorMatch[1].trim();
            majorCounts[major] = (majorCounts[major] || 0) + 1;
        }
    });
    
    console.log('Major counts:', majorCounts);
    
    // Không gọi updateStatsChart nữa vì element statsChart không tồn tại
    // Thay vào đó, cập nhật các chart mới nếu đang ở trang results
    if (window.location.pathname.includes('results.html')) {
        console.log('On results page, calling chart functions...');
        displayPopularMajorsChart();
        displayTimelineChart();
        displaySkillsChart();
    } else {
        console.log('Not on results page, skipping chart functions');
    }
}



// Khởi tạo biểu đồ
function initializeCharts() {
    // Chỉ khởi tạo charts nếu đang ở trang results
    if (window.location.pathname.includes('results.html')) {
        updateStatistics();
    }
}

// Load lịch sử tư vấn
function loadConsultationHistory() {
    console.log('loadConsultationHistory called');
    const saved = localStorage.getItem('consultationHistory');
    consultationHistory = saved ? JSON.parse(saved) : [];
    
    console.log('Loaded consultation history:', consultationHistory.length, 'items');
    
    // Thêm dữ liệu mẫu nếu chưa có dữ liệu
    if (consultationHistory.length === 0) {
        console.log('No data found, adding sample data...');
        addSampleData();
    }
    
    if (consultationHistory.length > 0) {
        console.log('Calling updateStatistics...');
        updateStatistics();
    }
    
    console.log('Consultation history loaded successfully');
    console.log('Final consultationHistory length:', consultationHistory.length);
}

function addSampleData() {
    console.log('addSampleData called');
    console.log('Current consultationHistory length before adding:', consultationHistory.length);
    const sampleData = [
        {
            name: 'Nguyễn Văn A',
            interests: 'Lập trình, Công nghệ, Toán học',
            skills: 'Lập trình Java, Tiếng Anh, Làm việc nhóm',
            scores: { math: 8, english: 7, programming: 9 },
            recommendedMajor: 'Công nghệ thông tin',
            aiResponse: 'Dựa trên sở thích và kỹ năng của bạn, tôi khuyên bạn nên theo học ngành Công nghệ thông tin. Bạn có năng khiếu về lập trình và tư duy logic tốt.',
            date: new Date(2024, 2, 15).toISOString(),
            rating: 5
        },
        {
            name: 'Trần Thị B',
            interests: 'Thiết kế, Nghệ thuật, Sáng tạo',
            skills: 'Photoshop, Illustrator, Sáng tạo',
            scores: { math: 6, english: 8, programming: 5 },
            recommendedMajor: 'Thiết kế đồ họa',
            aiResponse: 'Với khả năng sáng tạo và yêu thích nghệ thuật, ngành Thiết kế đồ họa sẽ phù hợp với bạn. Bạn có thể phát triển tài năng thiết kế.',
            date: new Date(2024, 3, 10).toISOString(),
            rating: 4
        },
        {
            name: 'Lê Văn C',
            interests: 'Kinh doanh, Marketing, Giao tiếp',
            skills: 'Giao tiếp, Lãnh đạo, Marketing',
            scores: { math: 7, english: 9, programming: 4 },
            recommendedMajor: 'Quản trị kinh doanh',
            aiResponse: 'Bạn có tố chất lãnh đạo và khả năng giao tiếp tốt. Ngành Quản trị kinh doanh sẽ giúp bạn phát triển toàn diện.',
            date: new Date(2024, 4, 5).toISOString(),
            rating: 5
        },
        {
            name: 'Phạm Thị D',
            interests: 'Kế toán, Tài chính, Chi tiết',
            skills: 'Tính toán, Phân tích, Cẩn thận',
            scores: { math: 9, english: 6, programming: 3 },
            recommendedMajor: 'Kế toán',
            aiResponse: 'Với khả năng tính toán và sự cẩn thận, ngành Kế toán sẽ phù hợp với bạn. Bạn có thể phát triển trong lĩnh vực tài chính.',
            date: new Date(2024, 5, 20).toISOString(),
            rating: 4
        },
        {
            name: 'Hoàng Văn E',
            interests: 'Cơ khí, Kỹ thuật, Thực hành',
            skills: 'Thực hành, Kỹ thuật, Làm việc nhóm',
            scores: { math: 8, english: 5, programming: 6 },
            recommendedMajor: 'Cơ khí',
            aiResponse: 'Bạn có năng khiếu về kỹ thuật và thích thực hành. Ngành Cơ khí sẽ giúp bạn phát triển kỹ năng thực tế.',
            date: new Date(2024, 6, 12).toISOString(),
            rating: 5
        }
    ];
    
    consultationHistory = sampleData;
    localStorage.setItem('consultationHistory', JSON.stringify(consultationHistory));
    console.log('Sample data added. Total consultations:', consultationHistory.length);
    console.log('Sample data details:', consultationHistory.map(c => ({ name: c.name, major: c.recommendedMajor })));
}

// Hiển thị lỗi
function showError(message) {
    document.getElementById('loadingResult').style.display = 'none';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.add('show');
    resultSection.insertBefore(errorDiv, resultSection.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Hiển thị thành công
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    
    const resultSection = document.getElementById('resultSection');
    resultSection.insertBefore(successDiv, resultSection.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Debug function to clear localStorage and reload sample data
function debugReloadData() {
    localStorage.removeItem('consultationHistory');
    consultationHistory = [];
    addSampleData();
    displayResultsStatistics();
    displayPopularMajorsChart();
    displayTimelineChart();
    displaySkillsChart();
    displayConsultationHistory();
    console.log('Data reloaded successfully!');
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event fired');
    await loadMajorsData();
    console.log('Majors data loaded');
    initializeMultiPage();
    console.log('Multi-page initialized');
    setupFormHandling();
    setupChatHandling();
    loadConsultationHistory();
    
    // Đảm bảo có dữ liệu mẫu nếu chưa có
    if (consultationHistory.length === 0) {
        console.log('No consultation history, adding sample data...');
        addSampleData();
    }
    
    console.log('DOMContentLoaded completed');
});

function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function resetChatHistory() {
    chatHistory = [];
    saveChatHistory();
    
    // Clear chat messages
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
    
    // Add welcome message
    addMessageToChat('ai', 'Xin chào! Tôi là AI tư vấn viên của FPT Polytechnic. Tôi có thể giúp bạn:\n\n• Tìm hiểu về các ngành học\n• Tư vấn chọn ngành phù hợp\n• Giải đáp thắc mắc về trường\n\nBạn muốn biết thêm thông tin gì?', false, true);
}

function addMessageToChat(sender, message, isStreaming = false, skipHistory = false) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    if (isStreaming) {
        messageDiv.id = 'streamingMessage';
        currentStreamingMessage = messageDiv;
    }
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const header = document.createElement('div');
    header.className = 'message-header';
    
    const senderName = document.createElement('span');
    senderName.className = 'sender-name';
    
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    
    if (sender === 'user') {
        avatar.innerHTML = '<i class="fas fa-user"></i>';
        senderName.textContent = 'Bạn';
        messageTime.textContent = getCurrentTime();
        textDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    } else {
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        senderName.textContent = 'AI Tư Vấn';
        messageTime.textContent = getCurrentTime();
        // Render markdown for AI messages
        textDiv.innerHTML = marked.parse(message);
    }
    
    header.appendChild(senderName);
    header.appendChild(messageTime);
    content.appendChild(header);
    content.appendChild(textDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to history if not skipped
    if (!skipHistory) {
        chatHistory.push({ sender, message, timestamp: new Date() });
        saveChatHistory();
    }
}
