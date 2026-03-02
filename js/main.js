/**
 * COGNODE - Web 4.0 AI Agent Recruitment Platform
 * Main JavaScript Module
 */

// Agent Data (Global)
window.AGENTS_DATA = [
    {
        id: 1,
        name: "Neura-X Prime",
        category: "productivity",
        avatar: '<i class="fas fa-brain text-neon-blue"></i>',
        description: "Ultra-smart productivity agent with deep context understanding and proactive predictions.",
        skills: { productivity: 98, emotion: 85, iot: 92, adaptability: 96 },
        status: "online",
        emotion: "focused",
        price: "Free",
        features: ["Smart Scheduling", "Email Intelligence", "Context Awareness", "Proactive Suggestions"]
    },
    {
        id: 2,
        name: "Aura Creative",
        category: "creative",
        avatar: '<i class="fas fa-pen-nib text-neon-purple"></i>',
        description: "Creative partner that understands emotional nuances and cultural context for resonant content.",
        skills: { creativity: 99, emotion: 95, context: 90, trend: 94 },
        status: "online",
        emotion: "inspired",
        price: "$29/mo",
        features: ["Emotion-aware Design", "Trend Prediction", "Multi-modal Content", "Brand Voice Learning"]
    },
    {
        id: 3,
        name: "Sync IoT Master",
        category: "iot",
        avatar: '<i class="fas fa-network-wired text-neon-green"></i>',
        description: "Central IoT controller with real-time response <10ms and preventive maintenance predictions.",
        skills: { iot: 100, automation: 98, security: 95, efficiency: 97 },
        status: "busy",
        emotion: "calculating",
        price: "$49/mo",
        features: ["Universal Protocol", "Predictive Maintenance", "Energy Optimization", "Security Monitoring"]
    },
    {
        id: 4,
        name: "Empath Companion",
        category: "emotional",
        avatar: '<i class="fas fa-heart-pulse text-pink-500"></i>',
        description: "Emotional support agent with accurate sentiment detection and deeply empathetic responses.",
        skills: { empathy: 100, psychology: 96, listening: 99, support: 98 },
        status: "online",
        emotion: "caring",
        price: "$19/mo",
        features: ["Mood Tracking", "Crisis Detection", "Therapeutic Dialogue", "Wellness Coaching"]
    },
    {
        id: 5,
        name: "Code Weaver",
        category: "productivity",
        avatar: '<i class="fas fa-laptop-code text-yellow-400"></i>',
        description: "AI developer who understands business context and user emotions for human-centric code.",
        skills: { coding: 99, architecture: 95, ux: 92, debug: 98 },
        status: "online",
        emotion: "focused",
        price: "$39/mo",
        features: ["Context-aware Coding", "Emotion UI Optimization", "Auto-documentation", "Bug Prediction"]
    },
    {
        id: 6,
        name: "Guardian Security",
        category: "iot",
        avatar: '<i class="fas fa-user-shield text-red-500"></i>',
        description: "Sistem keamanan proaktif dengan analisis perilaku dan deteksi anomali real-time.",
        skills: { security: 100, analysis: 97, response: 99, prediction: 94 },
        status: "online",
        emotion: "vigilant",
        price: "$59/mo",
        features: ["Behavioral Analysis", "Threat Prediction", "Auto-response", "Privacy Protection"]
    }
];

const AGENTS_DATA = window.AGENTS_DATA;
// Chat Responses
const CHAT_RESPONSES = [
    { 
    { 
        text: "Saya menganalisis konteks permintaan Anda. Berdasarkan emosi dan situasi saat ini, saya sarankan untuk merekrut agen Aura Creative untuk tugas ini.", 
        emotion: "focused" 
    },
    { 
        text: "Terdeteksi kebutuhan integrasi IoT. Saya dapat menghubungkan Sync IoT Master dengan perangkat Anda sekarang. Aktifkan mode AR untuk visualisasi?", 
        emotion: "focused" 
    },
    { 
        text: "Saya memahami frustrasi Anda. Mari saya bantu dengan pendekatan yang lebih tenang. Empath Companion siap mendampingi.", 
        emotion: "calm" 
    },
    { 
        text: "Konteks percakapan menunjukkan optimisme tinggi! Neura-X Prime siap memaksimalkan produktivitas Anda hari ini.", 
        emotion: "happy" 
    },
    {
        text: "Saya mendeteksi pola kerja Anda. Izinkan saya mengoptimalkan jadwal dan merekomendasikan agen yang sesuai.",
        emotion: "focused"
    },
    {
        text: "Mode AR telah siap. Anda dapat melihat visualisasi 3D dari data IoT Anda sekarang.",
        emotion: "focused"
    }
];

// Main Application Class
class COGNODEApp {
    constructor() {
        this.currentFilter = 'all';
        this.currentSort = 'relevance';
        this.isVoiceMode = false;
        this.isRecording = false;
        this.recruitedAgents = [];
        this.isChatMinimized = false;
        this.gestureHistory = [];
        this.iotInterval = null;
        this.statsInterval = null;
        this.compareList = []; // List of agent IDs to compare
        this.textStyle = 'cmd';
        this.performanceMode =
            (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
            (navigator.deviceMemory && navigator.deviceMemory < 4);
        
        this.init();
    }

    init() {
        try {
            this.renderAgents();
        } catch (e) {
            console.error('Initial render failed:', e);
        }
        if (this.performanceMode) {
            document.body.classList.add('perf-mode');
        } else {
            document.body.classList.remove('perf-mode');
        }
        // Safely run other modules to avoid interrupting sequence
        if (!this.performanceMode) this.safeRun('initParticles', () => this.initParticles());
        if (!this.performanceMode) this.safeRun('initIoTSimulation', () => this.initIoTSimulation());
        this.safeRun('initGestureArea', () => this.initGestureArea());
        if (!this.performanceMode) this.safeRun('updateStats', () => this.updateStats());
        this.safeRun('initEventListeners', () => this.initEventListeners());
        if (!this.performanceMode) this.safeRun('initScrollAnimations', () => this.initScrollAnimations());
        this.safeRun('initSearch', () => this.initSearch());
        console.log('🚀 COGNODE Web 4.0 Platform Initialized');
    }

    handleSort(sortType) {
        this.currentSort = sortType;
        const searchInput = document.getElementById('agent-search');
        const searchTerm = searchInput ? searchInput.value : '';
        this.renderAgents(this.currentFilter, searchTerm);
    }

    parsePrice(priceStr) {
        if (!priceStr || priceStr === 'Free') return 0;
        return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    }

    // ==================== AGENT RENDERING ====================
    
    renderAgents(filter = this.currentFilter, searchTerm = '') {
        console.log('Rendering agents...', filter, searchTerm);
        try {
            // Validate parameters
            if (typeof filter !== 'string') {
                throw new Error(`Invalid filter parameter: expected string, got ${typeof filter}`);
            }
            if (typeof searchTerm !== 'string') {
                throw new Error(`Invalid searchTerm parameter: expected string, got ${typeof searchTerm}`);
            }

            const grid = document.getElementById('agents-grid');
            if (!grid) {
                throw new Error('Agents grid element not found in DOM');
            }

            // Validate AGENTS_DATA
            if (!Array.isArray(AGENTS_DATA) || AGENTS_DATA.length === 0) {
                throw new Error('AGENTS_DATA is empty or invalid');
            }

            let filtered = filter === 'all' 
                ? [...AGENTS_DATA] 
                : AGENTS_DATA.filter(a => a.category === filter);

            // Validate filtered results
            if (!Array.isArray(filtered)) {
                throw new Error('Filter operation returned invalid result');
            }

            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                if (typeof term !== 'string') {
                    throw new Error('Failed to convert search term to lowercase');
                }
                
                filtered = filtered.filter(a => {
                    try {
                        return a.name && a.name.toLowerCase().includes(term) || 
                               a.description && a.description.toLowerCase().includes(term) ||
                               a.features && Array.isArray(a.features) && a.features.some(f => 
                                   f && f.toLowerCase().includes(term)
                               );
                    } catch (searchError) {
                        console.warn('Error filtering agent:', a.name, searchError);
                        return false; // Exclude problematic agents from search results
                    }
                });
            }

            // Sorting Logic
            switch (this.currentSort) {
                case 'price-asc':
                    filtered.sort((a, b) => this.parsePrice(a.price) - this.parsePrice(b.price));
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => this.parsePrice(b.price) - this.parsePrice(a.price));
                    break;
                case 'name-asc':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }

            // Validate createAgentCard method exists
            if (typeof this.createAgentCard !== 'function') {
                throw new Error('createAgentCard method is not available');
            }

            // Generate HTML for filtered agents
            let agentCards;
            try {
                agentCards = filtered.map(agent => {
                    try {
                        return this.createAgentCard(agent);
                    } catch (cardError) {
                        console.warn('Error creating card for agent:', agent.name, cardError);
                        return ''; // Skip problematic agents
                    }
                }).join('');
            } catch (mapError) {
                throw new Error(`Failed to generate agent cards: ${mapError.message}`);
            }

            // Validate generated HTML
            if (typeof agentCards !== 'string') {
                throw new Error('Generated agent cards HTML is invalid');
            }

            grid.innerHTML = agentCards;
            
            // Animate skill bars after render with error handling
            setTimeout(() => {
                try {
                    this.animateSkillBars();
                } catch (animationError) {
                    console.warn('Error animating skill bars:', animationError);
                    // Non-critical error, continue execution
                }
            }, 100);

            // Log successful render
            console.log(`Rendered ${filtered.length} agents (filter: ${filter}, search: "${searchTerm}")`);

        } catch (error) {
            console.error('Error in renderAgents:', error);
            
            // Show user-friendly notification
                if (window.notificationManager) {
                    window.notificationManager.show('Failed to display agents. Please refresh the page.', 'error');
                }

            // Log detailed error for debugging
            const errorInfo = {
                type: 'render_agents',
                filter: filter,
                searchTerm: searchTerm,
                error: error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString()
            };
            
            if (window.errorHandler) {
                window.errorHandler.logError(errorInfo);
            }

            // Attempt fallback: show all agents without search
            try {
                const grid = document.getElementById('agents-grid');
                if (grid && AGENTS_DATA && Array.isArray(AGENTS_DATA)) {
                    const fallbackCards = AGENTS_DATA.map(agent => {
                        try {
                            return this.createMinimalAgentCard(agent);
                        } catch (fallbackError) {
                            console.error('Fallback card creation failed:', fallbackError);
                            return '';
                        }
                    }).join('');
                    
                    if (fallbackCards) {
                        grid.innerHTML = fallbackCards;
                    }
                }
            } catch (fallbackError) {
                console.error('Fallback rendering failed:', fallbackError);
            }
        }
    }

    createAgentCard(agent) {
        try {
            // Safe access to properties with defaults
            const id = agent.id;
            const name = agent.name || 'Unknown Agent';
            const description = agent.description || 'No description';
            const price = agent.price || 'Contact us';
            const avatar = agent.avatar || '🤖';
            const emotion = agent.emotion || 'neutral';
            const category = agent.category || 'general';
            
            // Inline emotion color mapping
            const emotionColors = {
                'focused': '#38bdf8',
                'happy': '#fbbf24',
                'calm': '#34d399',
                'inspired': '#a78bfa',
                'calculating': '#f87171',
                'caring': '#f472b6',
                'vigilant': '#fb923c'
            };
            const emotionHex = emotionColors[emotion] || '#9ca3af';
            
            // Render skills safely
            let skillsHtml = '';
            if (agent.skills && typeof agent.skills === 'object') {
                skillsHtml = Object.entries(agent.skills).slice(0, 3).map(([skill, value]) => `
                    <div class="mb-2">
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-gray-400 capitalize">${skill}</span>
                            <span class="font-mono text-white">${value}%</span>
                        </div>
                        <div class="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                            <div class="h-full rounded-full" style="width: ${value}%; background-color: ${emotionHex}"></div>
                        </div>
                    </div>
                `).join('');
            }

            const isCompared = (this.compareList && this.compareList.includes(id)) ? 'checked' : '';

            // Return simplified but stylish HTML
            return `
                <div class="agent-card glass-panel rounded-2xl border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 p-6" data-agent-id="${id}" style="border-color: ${emotionHex}40">
                    <div class="absolute top-0 left-0 w-full h-1" style="background-color: ${emotionHex}"></div>
                    
                    <div class="flex justify-between items-start mb-6">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300" style="background-color: ${emotionHex}15">
                                ${avatar}
                            </div>
                            <div>
                                <h3 class="font-bold text-lg text-white">${name}</h3>
                                <div class="text-xs text-gray-400 uppercase tracking-wider font-semibold" style="color: ${emotionHex}">${category}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-[10px] text-gray-500 uppercase tracking-wider">Rate</div>
                            <div class="font-bold text-white font-mono">${price}</div>
                        </div>
                    </div>
                    
                    <p class="text-gray-400 text-sm mb-6 line-clamp-2 h-10">${description}</p>
                    
                    <div class="space-y-2 mb-6">
                        ${skillsHtml}
                    </div>
                    
                    <div class="flex items-center justify-between pt-4 border-t border-white/5">
                        <label class="flex items-center gap-2 cursor-pointer select-none group/check">
                            <input type="checkbox" class="accent-neon-blue" onchange="app.toggleCompare(${id}, this)" ${isCompared}>
                            <span class="text-xs text-gray-500 group-hover/check:text-white transition-colors">Compare</span>
                        </label>
                        
                        <button onclick="app.openRecruitModal(${id})" class="px-5 py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg" style="background-color: ${emotionHex}">
                            HIRE AGENT
                        </button>
                    </div>
                </div>
            `;
        } catch (e) {
            console.error('CreateAgentCard Error:', e);
            return `<div class="p-4 text-red-500 border border-red-500 rounded">Error rendering agent ${agent?.name}</div>`;
        }
    }

    getEmotionColorCode(emotion) {
        const map = {
            'focused': '#38bdf8', // Sky 400
            'happy': '#fbbf24', // Amber 400
            'calm': '#34d399', // Emerald 400
            'inspired': '#a78bfa', // Violet 400
            'calculating': '#f87171', // Red 400
            'caring': '#f472b6', // Pink 400
            'vigilant': '#fb923c' // Orange 400
        };
        return map[emotion] || '#9ca3af'; // Gray 400
    }

    getEmotionColor(emotion) {
        const map = {
            'focused': 'blue-400',
            'happy': 'yellow-400',
            'calm': 'green-400',
            'inspired': 'purple-400',
            'calculating': 'red-400',
            'caring': 'pink-400',
            'vigilant': 'orange-400'
        };
        return map[emotion] || 'gray-400';
    }

    toggleCompare(id, checkbox) {
        if (checkbox.checked) {
            if (this.compareList.length >= 2) {
                checkbox.checked = false;
                window.notificationManager.show('Maksimal 2 agen untuk perbandingan', 'warning');
                return;
            }
            this.compareList.push(id);
        } else {
            this.compareList = this.compareList.filter(agentId => agentId !== id);
        }
        this.updateCompareButton();
    }

    updateCompareButton() {
        let compareBtn = document.getElementById('compare-action-btn');
        if (!compareBtn) {
            compareBtn = document.createElement('button');
            compareBtn.id = 'compare-action-btn';
            compareBtn.className = 'fixed bottom-24 right-8 z-50 glass-panel border border-neon-blue text-neon-blue px-6 py-3 rounded-full font-bold shadow-neon transition-all transform translate-y-20 opacity-0 hover:bg-neon-blue hover:text-black';
            compareBtn.innerHTML = '<i class="fas fa-balance-scale mr-2"></i> Bandingkan (0)';
            compareBtn.onclick = () => this.showCompareModal();
            document.body.appendChild(compareBtn);
        }

        if (this.compareList.length > 0) {
            compareBtn.innerHTML = `<i class="fas fa-balance-scale mr-2"></i> Bandingkan (${this.compareList.length})`;
            compareBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            compareBtn.classList.add('translate-y-20', 'opacity-0');
        }
    }

    showCompareModal() {
        if (this.compareList.length < 2) {
             window.notificationManager.show('Pilih minimal 2 agen untuk dibandingkan', 'info');
             return;
        }
        
        const agents = AGENTS_DATA.filter(a => this.compareList.includes(a.id));
        const modalContent = `
            <div class="grid grid-cols-2 gap-8 relative">
                <div class="absolute inset-y-0 left-1/2 w-px bg-white/10 -translate-x-1/2"></div>
                ${agents.map(agent => `
                    <div class="text-center relative z-10">
                        <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center text-4xl border border-white/10 mb-4 shadow-lg">
                            ${agent.avatar}
                        </div>
                        <h3 class="font-orbitron font-bold text-xl mb-1 text-white">${agent.name}</h3>
                        <div class="text-xs text-gray-400 mb-6 uppercase tracking-wider">${agent.category}</div>
                        
                        <div class="space-y-4 text-left">
                            <div class="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div class="text-xs text-gray-500 mb-1">Harga Bulanan</div>
                                <div class="font-bold text-neon-green text-lg">${agent.price}</div>
                            </div>
                            <div class="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div class="text-xs text-gray-500 mb-1">Status Emosi</div>
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-${this.getEmotionColor(agent.emotion)}"></span>
                                    <span class="capitalize text-gray-200">${agent.emotion}</span>
                                </div>
                            </div>
                            <div class="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div class="text-xs text-gray-500 mb-2">Top Skills</div>
                                <div class="flex flex-wrap gap-2">
                                    ${Object.entries(agent.skills).slice(0,3).map(([k,v]) => 
                                        `<span class="text-xs px-2 py-1 rounded bg-white/10 text-neon-blue">${k} ${v}%</span>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <button onclick="app.openRecruitModal(${agent.id})" class="w-full mt-6 py-3 rounded-xl bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:border-neon-blue transition-all font-bold text-sm">
                            Pilih ${agent.name.split(' ')[0]}
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="mt-8 pt-6 border-t border-white/10 text-center">
                 <p class="text-gray-400 text-xs uppercase tracking-widest mb-4">AI Analysis</p>
                 <div class="glass-panel p-4 rounded-xl border border-neon-purple/30 bg-neon-purple/5 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1 h-full bg-neon-purple"></div>
                    <div class="flex items-start gap-3 text-left">
                        <i class="fas fa-magic text-neon-purple mt-1"></i>
                        <div>
                            <span class="text-sm text-gray-300">Rekomendasi Sistem:</span>
                            <p class="text-white text-sm mt-1">Berdasarkan profil skill, <strong>${agents[0].skills.productivity > agents[1].skills.productivity ? agents[0].name : agents[1].name}</strong> memiliki skor produktivitas agregat yang lebih tinggi untuk tugas kompleks.</p>
                        </div>
                    </div>
                 </div>
            </div>
        `;
        
        const modal = document.getElementById('recruit-modal');
        const title = modal.querySelector('h3');
        const content = document.getElementById('modal-content');
        
        title.innerHTML = '<i class="fas fa-balance-scale mr-2"></i>Perbandingan Agen';
        content.innerHTML = modalContent;
        modal.classList.remove('hidden');
    }

    getEmotionClass(emotion) {
        const emotionMap = {
            'focused': 'emotion-focused',
            'happy': 'emotion-happy',
            'calm': 'emotion-calm',
            'inspired': 'emotion-inspired',
            'calculating': 'emotion-calculating',
            'caring': 'emotion-caring',
            'vigilant': 'emotion-vigilant'
        };
        return emotionMap[emotion] || 'emotion-focused';
    }

    // Minimal agent card for fallback rendering during errors
    createMinimalAgentCard(agent) {
        try {
            // Basic validation
            if (!agent || !agent.id || !agent.name) {
                console.warn('Invalid agent data for minimal card:', agent);
                return '';
            }

            return `
                <div class="agent-card glass-panel rounded-3xl p-6 border border-white/5" data-agent-id="${agent.id}">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center text-2xl border border-white/10">
                            ${agent.avatar || '🤖'}
                        </div>
                        <div>
                            <h3 class="font-orbitron font-bold text-lg">${agent.name}</h3>
                            <p class="text-gray-400 text-sm">${agent.description || 'Agen AI profesional'}</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="text-sm">
                            <span class="text-gray-400">Harga:</span>
                            <span class="font-bold text-neon-green">${agent.price || 'Hubungi kami'}</span>
                        </div>
                        <button onclick="app.openRecruitModal(${agent.id})" class="recruit-btn px-4 py-2 rounded-full text-sm font-bold text-white hover:scale-105 transition-transform">
                            Rekrut
                        </button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error creating minimal agent card:', error);
            return '';
        }
    }

    animateSkillBars() {
        try {
            document.querySelectorAll('.skill-bar').forEach(bar => {
                const width = bar.dataset.width;
                if (!width || isNaN(parseInt(width))) {
                    throw new Error(`Invalid skill bar width: ${width}`);
                }
                setTimeout(() => {
                    bar.style.width = width;
                }, Math.random() * 500);
            });
        } catch (error) {
            console.error('Error animating skill bars:', error);
            if (window.notificationManager) {
                window.notificationManager.show('Gagal memuat animasi skill bar', 'error', 3000);
            }
        }
    }

    filterAgents(category) {
        try {
            this.currentFilter = category;
            
            // Validate category input
            if (!category || typeof category !== 'string') {
                throw new Error('Invalid category parameter');
            }
            
            // Update button states
            const filterButtons = document.querySelectorAll('.filter-btn');
            if (!filterButtons.length) {
                throw new Error('Filter buttons not found');
            }
            
            filterButtons.forEach(btn => {
                const isActive = btn.dataset.filter === category;
                btn.classList.toggle('active', isActive);
                btn.classList.toggle('bg-neon-blue/20', isActive);
                btn.classList.toggle('text-neon-blue', isActive);
                btn.classList.toggle('border-neon-blue/30', isActive);
                btn.classList.toggle('glass-panel', !isActive);
                btn.classList.toggle('text-gray-300', !isActive);
                btn.classList.toggle('border-white/10', !isActive);
            });

            this.renderAgents(category);
            
        } catch (error) {
            console.error('Error filtering agents:', error);
            
            // Fallback to default behavior
            this.currentFilter = 'all';
            this.renderAgents('all');
            
            // Show user-friendly notification
            if (window.notificationManager) {
                window.notificationManager.show('Gagal memfilter agen. Menampilkan semua agen.', 'warning', 4000);
            }
            
            // Log detailed error for debugging
            const errorInfo = {
                type: 'filter_agents',
                category: category,
                error: error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString()
            };
            
            if (window.errorHandler) {
                window.errorHandler.logError(errorInfo);
            }
        }
    }

    // ==================== RECRUITMENT MODAL ====================

    openRecruitModal(agentId) {
        try {
            // Validate agentId parameter
            if (!agentId || typeof agentId !== 'number') {
                throw new Error(`Invalid agentId parameter: expected number, got ${typeof agentId}`);
            }

            const agent = AGENTS_DATA.find(a => a.id === agentId);
            if (!agent) {
                console.warn(`Agent with ID ${agentId} not found`);
                if (window.notificationManager) {
                    window.notificationManager.show('Agen tidak ditemukan', 'error');
                }
                return;
            }

            // Validate required DOM elements
            const modal = document.getElementById('recruit-modal');
            const content = document.getElementById('modal-content');
            
            if (!modal || !content) {
                throw new Error('Required modal elements not found in DOM');
            }

            // Validate agent data structure
            if (!agent.avatar || !agent.name || !agent.description || !agent.features || !agent.skills) {
                throw new Error('Invalid agent data structure: missing required properties');
            }

            // Validate agent properties
            if (typeof agent.name !== 'string' || agent.name.trim() === '') {
                throw new Error('Invalid agent name: must be non-empty string');
            }
            if (typeof agent.description !== 'string' || agent.description.trim() === '') {
                throw new Error('Invalid agent description: must be non-empty string');
            }
            if (!Array.isArray(agent.features) || agent.features.length === 0) {
                throw new Error('Invalid agent features: must be non-empty array');
            }
            if (typeof agent.skills !== 'object' || Object.keys(agent.skills).length === 0) {
                throw new Error('Invalid agent skills: must be non-empty object');
            }

            const emotionHex = this.getEmotionColorCode(agent.emotion);

            content.innerHTML = `
                <div class="relative">
                    <!-- Header with agent theme color -->
                    <div class="absolute top-0 left-0 w-full h-32 rounded-t-3xl -mt-6 -mx-6 w-[calc(100%+3rem)] opacity-20 pointer-events-none" style="background: radial-gradient(circle at top right, ${emotionHex}, transparent 70%)"></div>
                    
                    <div class="flex flex-col md:flex-row gap-8 relative z-10">
                        <!-- Left Column: Profile -->
                        <div class="w-full md:w-1/3 flex flex-col items-center text-center">
                            <div class="w-32 h-32 rounded-2xl flex items-center justify-center text-6xl border-2 shadow-2xl mb-4 relative overflow-hidden group/avatar" style="background-color: ${emotionHex}10; border-color: ${emotionHex}30">
                                <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                                <span class="relative z-10 drop-shadow-lg group-hover/avatar:scale-110 transition-transform duration-500">${agent.avatar}</span>
                                <!-- Animated Ring -->
                                <div class="absolute inset-0 border-2 rounded-2xl animate-spin-slow" style="border-color: ${emotionHex}; border-style: dashed; opacity: 0.3"></div>
                            </div>
                            
                            <h2 class="font-orbitron text-2xl font-bold mb-1 text-white">${agent.name}</h2>
                            <div class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border" style="color: ${emotionHex}; background-color: ${emotionHex}10; border-color: ${emotionHex}30">
                                ${agent.category}
                            </div>
                            
                            <div class="w-full space-y-3">
                                <div class="glass-panel p-3 rounded-xl flex justify-between items-center border border-white/5">
                                    <span class="text-xs text-gray-400">Status</span>
                                    <span class="text-xs font-bold capitalize flex items-center gap-2">
                                        <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${emotionHex}"></span>
                                        ${agent.status}
                                    </span>
                                </div>
                                <div class="glass-panel p-3 rounded-xl flex justify-between items-center border border-white/5">
                                    <span class="text-xs text-gray-400">Rate</span>
                                    <span class="text-sm font-mono font-bold text-white">${agent.price}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Column: Details & Config -->
                        <div class="w-full md:w-2/3">
                            <h3 class="font-bold text-lg mb-2 text-white flex items-center gap-2">
                                <i class="fas fa-info-circle" style="color: ${emotionHex}"></i> About Agent
                            </h3>
                            <p class="text-gray-400 text-sm mb-6 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                                ${agent.description}
                            </p>
                            
                            <h3 class="font-bold text-lg mb-3 text-white flex items-center gap-2">
                                <i class="fas fa-chart-bar" style="color: ${emotionHex}"></i> Capabilities
                            </h3>
                            <div class="grid grid-cols-2 gap-3 mb-6">
                                ${Object.entries(agent.skills).map(([skill, value]) => `
                                    <div class="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div class="flex justify-between text-xs mb-2">
                                            <span class="capitalize text-gray-300">${skill}</span>
                                            <span class="font-mono font-bold" style="color: ${emotionHex}">${value}%</span>
                                        </div>
                                        <div class="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full" style="width: ${value}%; background-color: ${emotionHex}"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="border-t border-white/10 pt-6 mt-6">
                                <div class="flex justify-between items-center mb-4">
                                    <div>
                                        <div class="text-sm font-bold text-white">Project Duration</div>
                                        <div class="text-xs text-gray-500">Estimated timeline</div>
                                    </div>
                                    <select class="bg-black/30 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:border-neon-blue outline-none cursor-pointer">
                                        <option>1 Week Sprint</option>
                                        <option>1 Month</option>
                                        <option>3 Months</option>
                                        <option>Continuous</option>
                                    </select>
                                </div>
                                
                                <button onclick="app.processHiring(${agent.id})" class="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden group">
                                    <div class="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity" style="background-color: ${emotionHex}"></div>
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine transition-all duration-1000"></div>
                                    <span class="relative z-10 flex items-center gap-2">
                                        INITIATE CONTRACT <i class="fas fa-file-signature"></i>
                                    </span>
                                </button>
                                <p class="text-center text-[10px] text-gray-500 mt-3">
                                    <i class="fas fa-lock text-xs mr-1"></i> Secured by Web 4.0 Smart Contract Protocol
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            // Log successful modal opening
            console.log(`Recruitment modal opened for agent: ${agent.name} (ID: ${agentId})`);

        } catch (error) {
            console.error('Error in openRecruitModal:', error);
            
            // Show user-friendly notification
            if (window.notificationManager) {
                window.notificationManager.show('Gagal membuka modal rekrutmen. Silakan coba lagi.', 'error');
            }

            // Log detailed error for debugging
            const errorInfo = {
                type: 'open_recruit_modal',
                agentId: agentId,
                error: error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString()
            };
            
            if (window.errorHandler) {
                window.errorHandler.logError(errorInfo);
            }
        }
    }

    closeRecruitModal() {
        const modal = document.getElementById('recruit-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    processHiring(agentId) {
        const modal = document.getElementById('recruit-modal');
        const btn = modal.querySelector('button');
        if (btn) {
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> PROCESSING CONTRACT...';
            btn.disabled = true;
            btn.classList.add('opacity-75', 'cursor-wait');
        }
        
        // Simulate blockchain/smart contract delay
        setTimeout(() => {
            this.confirmRecruitment(agentId);
        }, 2000);
    }

    confirmRecruitment(agentId) {
        const agent = AGENTS_DATA.find(a => a.id === agentId);
        if (!agent) return;

        this.recruitedAgents.push(agent);
        
        // Add system message to chat
        this.addMessageToChat('system', `🎉 Selamat! Anda telah berhasil merekrut **${agent.name}**. Agen sekarang terhubung dengan dashboard Anda dan siap berinteraksi via Web 4.0 interface.`);
        
        this.closeRecruitModal();
        this.showNotification(`Berhasil merekrut ${agent.name}!`, 'success');
        
        // Update recruited agent UI
        const agentCard = document.querySelector(`[data-agent-id="${agentId}"]`);
        if (agentCard) {
            agentCard.classList.add('border-neon-green');
            setTimeout(() => agentCard.classList.remove('border-neon-green'), 2000);
        }
    }

    // ==================== CHAT SYSTEM ====================

    addMessageToChat(sender, text, emotion = null) {
        const container = document.getElementById('chat-container');
        if (!container) return;

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender} ${this.textStyle === 'cmd' ? 'cmd' : ''}`;
        
        let emotionBadge = '';
        if (this.textStyle !== 'cmd') {
            if (emotion && sender === 'agent') {
                const emotionClass = this.getEmotionClass(emotion);
                const icon = emotion === 'happy' ? 'smile' : emotion === 'focused' ? 'bullseye' : 'peace';
                emotionBadge = `<span class="emotion-indicator ${emotionClass} mb-2"><i class="fas fa-${icon}"></i> ${emotion}</span>`;
            }
        }

        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const icon = sender === 'agent' ? 'robot' : sender === 'user' ? 'user' : 'info';
        const iconColor = sender === 'agent' ? 'text-neon-purple' : sender === 'user' ? 'text-neon-blue' : 'text-neon-green';
        
        if (this.textStyle === 'cmd') {
            const prompt = sender === 'user' ? 'C:\\COGNODE\\system>' : 'COGNODE AI>';
            bubble.innerHTML = `
                <div class="cmd-line">
                    <span class="cmd-prompt">${prompt}</span>
                    <span class="cmd-text">${text}</span>
                </div>
                <div class="cmd-meta">${time}</div>
            `;
        } else {
            bubble.innerHTML = `
                <div class="flex items-start gap-3">
                    ${sender !== 'system' ? `<i class="fas fa-${icon} ${iconColor} mt-1"></i>` : ''}
                    <div class="flex-1">
                        ${emotionBadge}
                        <p class="text-sm leading-relaxed">${text}</p>
                        <div class="mt-2 flex gap-2">
                            <span class="text-xs text-gray-500">${time}</span>
                            ${sender === 'user' ? '<span class="text-xs text-neon-green">● Terkirim</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
    }

    handleChatKeypress(e) {
        const isEnter = e.key === 'Enter' || e.keyCode === 13 || e.which === 13;
        if (isEnter) {
            e.preventDefault();
            this.sendMessage();
            return false;
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;
        
        this.addMessageToChat('user', text);
        input.value = '';
        
        // Simulate agent typing
        this.showTypingIndicator();
        
        // Simulate response with context-aware logic
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getContextualResponse(text);
            this.addMessageToChat('agent', response.text, response.emotion);
            this.performContextAction(text);
        }, 1000 + Math.random() * 1000);
    }

    getContextualResponse(userText) {
        const text = userText.toLowerCase();
        
        // Context-aware responses
        if (text.includes('rekrut') || text.includes('agent') || text.includes('agen') || text.includes('recruit')) {
            return {
                text: "I can help you choose the right agent. Based on analysis, I recommend Neura-X Prime for productivity or Aura Creative for creative needs.",
                emotion: "focused"
            };
        }
        if (text.includes('iot') || text.includes('hubungkan') || text.includes('perangkat') || text.includes('connect')) {
            return {
                text: "Sync IoT Master is ready to connect your devices. Detected 24 smart home devices and 156 industrial sensors available for integration.",
                emotion: "focused"
            };
        }
        if (text.includes('emosi') || text.includes('mood') || text.includes('stres') || text.includes('emotion')) {
            return {
                text: "I detect you might need support. Empath Companion is available 24/7 to accompany you with a deeply empathetic approach.",
                emotion: "caring"
            };
        }
        if (text.includes('ar') || text.includes('vr') || text.includes('virtual')) {
            return {
                text: "AR/VR mode is ready to activate. You can visualize IoT data and interact with agents in 3D space. Click the 'Enter AR Mode' button to start.",
                emotion: "focused"
            };
        }
        
        // Default response
        return CHAT_RESPONSES[Math.floor(Math.random() * CHAT_RESPONSES.length)];
    }
    
    safeRun(label, fn) {
        try {
            fn();
        } catch (e) {
            console.warn(`${label} failed:`, e);
        }
    }

    performContextAction(userText) {
        const text = (userText || '').toLowerCase();
        // Recruit -> scroll to agents and open modal for Neura‑X Prime
        if (text.includes('rekrut') || text.includes('recruit') || text.includes('agent') || text.includes('agen')) {
            this.scrollToAgents();
            const prime = (window.AGENTS_DATA || []).find(a => a.name && a.name.toLowerCase().includes('neura-x prime')) || { id: 1 };
            setTimeout(() => this.openRecruitModal(prime.id), 600);
            this.showNotification('Membuka panel rekrut agen...', 'info');
            return;
        }
        // IoT -> highlight devices and scroll to IoT section
        if (text.includes('iot') || text.includes('connect') || text.includes('hubungkan') || text.includes('perangkat')) {
            document.getElementById('iot')?.scrollIntoView({ behavior: 'smooth' });
            this.highlightIoTDevices();
            this.showNotification('Menghubungkan IoT secara simulasi...', 'success');
            return;
        }
        // Emotion -> scroll to features section
        if (text.includes('emosi') || text.includes('emotion') || text.includes('mood')) {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            this.showNotification('Analisis emosi siap dijalankan', 'info');
            return;
        }
        // AR/VR -> enter AR
        if (text.includes('ar') || text.includes('vr') || text.includes('virtual')) {
            document.getElementById('interaction')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.enterAR(), 500);
            return;
        }
    }

    highlightIoTDevices() {
        const nodes = document.querySelectorAll('.iot-device');
        nodes.forEach(n => {
            n.classList.add('animate-pulse');
            setTimeout(() => n.classList.remove('animate-pulse'), 2000);
        });
    }
    initHeroTypewriter() {
        const el = document.getElementById('hero-typed');
        if (!el) return;
        // Prefer aria-label, fallback to data-text or default string
        const defaultText = "The first Web 4.0 platform with AI that understands emotions, connects to IoT, and interacts naturally via voice, gestures, and AR/VR.";
        const source = (el.getAttribute('aria-label') || el.dataset.text || defaultText).trim();
        // Prevent duplicate typing
        if (el.dataset.typed === 'done' || el.dataset.started === 'true') return;
        let started = false;
        const finish = () => {
            el.dataset.typed = 'done';
            const cursor = el.nextElementSibling;
            if (cursor && cursor.classList && cursor.classList.contains('typed-cursor')) {
                cursor.style.opacity = '0.6';
            }
        };
        // Start when visible
        const startTyping = () => {
            if (started) return;
            started = true;
            el.dataset.started = 'true';
            const isMobile = window.matchMedia && window.matchMedia('(max-width: 480px)').matches;
            const speed = isMobile ? 28 : 18;
            let i = 0;
            el.textContent = '';
            const intervalId = setInterval(() => {
                if (i < source.length) {
                    el.textContent += source.charAt(i);
                    i++;
                } else {
                    clearInterval(intervalId);
                    finish();
                }
            }, speed);
            // Safety fallback: if nothing typed after 2s, render full text
            setTimeout(() => {
                if (el.textContent.length === 0) {
                    clearInterval(intervalId);
                    el.textContent = source;
                    finish();
                }
            }, 2000);
        };
        // If IntersectionObserver available, start when in view
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startTyping();
                        io.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            io.observe(el);
        } else {
            startTyping();
        }
        // Robust fallback: ensure it starts shortly after load
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (!started) startTyping();
            }, 800);
        });
        // Immediate start to guarantee behavior on desktop
        startTyping();
        // Final guard: ensure completion within 9s
        setTimeout(() => {
            if (el.dataset.typed !== 'done') {
                el.textContent = source;
                finish();
            }
        }, 9000);
    }

    quickReply(text) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            this.sendMessage();
        }
    }

    showTypingIndicator() {
        const container = document.getElementById('chat-container');
        if (!container) return;

        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.className = 'chat-bubble agent';
        typing.innerHTML = `
            <div class="flex items-center gap-3">
                <svg viewBox="0 0 24 24" class="w-5 h-5 text-neon-purple" fill="none" aria-hidden="true">
                    <path d="M12 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <rect x="5" y="6.5" width="14" height="11" rx="5" stroke="currentColor" stroke-width="2"/>
                    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
                    <rect x="8" y="14.5" width="8" height="1.5" rx="0.75" fill="currentColor"/>
                </svg>
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    toggleAgentVoice() {
        const btn = document.getElementById('agent-voice-btn');
        if (btn) {
            btn.classList.toggle('bg-neon-blue/20');
            const isEnabled = btn.classList.contains('bg-neon-blue/20');
            this.showNotification(isEnabled ? 'Text-to-Speech enabled' : 'Text-to-Speech disabled');
        }
    }

    minimizeChat() {
        const chatSection = document.getElementById('chat-section');
        const floatingChat = document.getElementById('floating-chat');
        
        if (chatSection && floatingChat) {
            chatSection.style.display = 'none';
            floatingChat.classList.remove('hidden');
            this.isChatMinimized = true;
        }
    }

    restoreChat() {
        const chatSection = document.getElementById('chat-section');
        const floatingChat = document.getElementById('floating-chat');
        
        if (chatSection && floatingChat) {
            chatSection.style.display = 'block';
            floatingChat.classList.add('hidden');
            this.isChatMinimized = false;
        }
    }

    showGesturePad() {
        this.showNotification('Gesture pad enabled — Move the cursor in the Gesture Control area', 'info');
        document.getElementById('gesture-area')?.scrollIntoView({ behavior: 'smooth' });
    }

    // ==================== VOICE INTERACTION ====================

    toggleVoiceMode() {
        this.isVoiceMode = !this.isVoiceMode;
        this.showNotification(this.isVoiceMode ? 'Voice Mode Active' : 'Text Mode Active');
    }

    toggleVoiceInput() {
        const btn = document.getElementById('voice-btn');
        const visualizer = document.getElementById('voice-visualizer');
        const text = document.getElementById('voice-text');
        
        if (!btn || !visualizer || !text) return;
        
        this.isRecording = !this.isRecording;
        
        if (this.isRecording) {
            btn.innerHTML = '<i class="fas fa-stop"></i><span>Stop</span>';
            btn.classList.add('bg-red-500/20', 'border-red-500/40', 'text-red-400');
            btn.classList.remove('bg-neon-blue/20', 'border-neon-blue/40', 'text-neon-blue');
            visualizer.style.opacity = '1';
            text.textContent = 'Listening...';
            
            // Simulate voice recognition
            setTimeout(() => {
                if (this.isRecording) {
                    this.toggleVoiceInput();
                    const voiceInputs = [
                        'Recruit an agent to help with my presentation tomorrow',
                        'Connect my smart home IoT',
                        'Analyze my productivity this week',
                        'Activate AR mode'
                    ];
                    const randomInput = voiceInputs[Math.floor(Math.random() * voiceInputs.length)];
                    const chatInput = document.getElementById('chat-input');
                    if (chatInput) {
                        chatInput.value = randomInput;
                        this.sendMessage();
                    }
                }
            }, 3000);
        } else {
            btn.innerHTML = '<i class="fas fa-microphone"></i><span>Start Recording</span>';
            btn.classList.remove('bg-red-500/20', 'border-red-500/40', 'text-red-400');
            btn.classList.add('bg-neon-blue/20', 'border-neon-blue/40', 'text-neon-blue');
            visualizer.style.opacity = '0';
            text.textContent = 'Click the microphone to start talking...';
        }
    }

    // ==================== GESTURE CONTROL ====================

    initGestureArea() {
        const area = document.getElementById('gesture-area');
        const cursor = document.getElementById('gesture-cursor');
        const gestureText = document.getElementById('detected-gesture');
        const confidenceText = document.getElementById('gesture-confidence');
        
        if (!area || !cursor) return;

        const gestures = ['Swipe Up', 'Swipe Down', 'Circle', 'Pinch', 'Wave', 'Tap', 'Hold'];
        let lastGestureTime = 0;
        
        area.addEventListener('mouseenter', () => {
            cursor.classList.remove('hidden');
        });
        
        area.addEventListener('mouseleave', () => {
            cursor.classList.add('hidden');
        });
        
        area.addEventListener('mousemove', (e) => {
            const rect = area.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursor.style.left = x - 16 + 'px';
            cursor.style.top = y - 16 + 'px';
            
            // Simulate gesture detection with throttling
            const now = Date.now();
            if (now - lastGestureTime > 800 && Math.random() > 0.92) {
                lastGestureTime = now;
                const gesture = gestures[Math.floor(Math.random() * gestures.length)];
                const confidence = Math.floor(Math.random() * 15 + 85);
                
                if (gestureText) gestureText.textContent = gesture;
                if (confidenceText) confidenceText.textContent = confidence + '%';
                
                // Visual feedback
                cursor.style.transform = 'scale(1.5)';
                setTimeout(() => cursor.style.transform = 'scale(1)', 200);
            }
        });
        
        area.addEventListener('click', () => {
            if (gestureText) gestureText.textContent = 'Select';
            if (confidenceText) confidenceText.textContent = '99%';
            this.showNotification('Gesture confirmed: Select');
        });
    }

    // ==================== IoT SIMULATION ====================

    initIoTSimulation() {
        try {
            // Validate that setInterval is available
            if (typeof setInterval !== 'function') {
                throw new Error('setInterval is not available');
            }

            const logs = document.getElementById('iot-logs');
            if (!logs) {
                console.warn('IoT logs container not found in DOM');
                return;
            }

            // Validate container is a valid DOM element
            if (!(logs instanceof HTMLElement)) {
                throw new Error('IoT logs container is not a valid DOM element');
            }

            // Validate and prepare device and action arrays
            const devices = ['Smart Lamp', 'Thermostat', 'Security Cam', 'Door Lock', 'Motion Sensor', 'Smart TV', 'Air Purifier'];
            const actions = ['activated', 'adjusted', 'detected motion', 'locked', 'optimized', 'synced', 'calibrated'];
            
            if (!Array.isArray(devices) || devices.length === 0) {
                throw new Error('Devices array is invalid or empty');
            }
            if (!Array.isArray(actions) || actions.length === 0) {
                throw new Error('Actions array is invalid or empty');
            }

            // Validate updateSensorValue method exists
            if (typeof this.updateSensorValue !== 'function') {
                throw new Error('updateSensorValue method is not available');
            }

            this.iotInterval = setInterval(() => {
                try {
                    // Update sensor values with smooth transitions
                    try {
                        const tempValue = (20 + Math.random() * 5).toFixed(1) + '°C';
                        const humidityValue = Math.floor(50 + Math.random() * 20) + '%';
                        const energyValue = (2 + Math.random() * 1.5).toFixed(1) + 'kW';
                        
                        this.updateSensorValue('iot-temp', tempValue);
                        this.updateSensorValue('iot-humidity', humidityValue);
                        this.updateSensorValue('iot-energy', energyValue);
                    } catch (sensorError) {
                        console.warn('Error updating sensor values:', sensorError);
                        // Continue with other updates
                    }
                    
                    // Update progress bars
                    try {
                        const tempBar = document.getElementById('temp-bar');
                        const humidityBar = document.getElementById('humidity-bar');
                        const energyBar = document.getElementById('energy-bar');
                        
                        if (tempBar) {
                            const tempWidth = (60 + Math.random() * 30);
                            if (tempWidth >= 0 && tempWidth <= 100) {
                                tempBar.style.width = tempWidth + '%';
                            }
                        }
                        if (humidityBar) {
                            const humidityWidth = (50 + Math.random() * 30);
                            if (humidityWidth >= 0 && humidityWidth <= 100) {
                                humidityBar.style.width = humidityWidth + '%';
                            }
                        }
                        if (energyBar) {
                            const energyWidth = (30 + Math.random() * 40);
                            if (energyWidth >= 0 && energyWidth <= 100) {
                                energyBar.style.width = energyWidth + '%';
                            }
                        }
                    } catch (barError) {
                        console.warn('Error updating progress bars:', barError);
                        // Continue with log entry
                    }
                    
                    // Add log entry
                    try {
                        const deviceIndex = Math.floor(Math.random() * devices.length);
                        const actionIndex = Math.floor(Math.random() * actions.length);
                        
                        if (deviceIndex < 0 || deviceIndex >= devices.length) {
                            throw new Error('Invalid device index generated');
                        }
                        if (actionIndex < 0 || actionIndex >= actions.length) {
                            throw new Error('Invalid action index generated');
                        }
                        
                        const device = devices[deviceIndex];
                        const action = actions[actionIndex];
                        const time = new Date().toLocaleTimeString();
                        
                        if (!device || !action || !time) {
                            throw new Error('Invalid log entry data generated');
                        }
                        
                        const logEntry = document.createElement('div');
                        if (!logEntry) {
                            throw new Error('Failed to create log entry element');
                        }
                        
                        logEntry.className = 'flex justify-between items-center text-gray-400 animate-fade-in';
                        logEntry.innerHTML = `
                            <span class="text-neon-green">[${time}]</span>
                            <span class="flex-1 mx-2">${device} ${action}</span>
                            <span class="text-xs text-gray-600">auto</span>
                        `;
                        
                        logs.insertBefore(logEntry, logs.firstChild);
                        
                        // Maintain log size limit
                        while (logs.children.length > 6) {
                            if (logs.lastChild) {
                                logs.lastChild.remove();
                            }
                        }
                        
                    } catch (logError) {
                        console.warn('Error creating log entry:', logError);
                        // Continue execution
                    }
                    
                } catch (intervalError) {
                    console.error('Error in IoT simulation interval:', intervalError);
                    
                    // Log error for debugging
                    const errorInfo = {
                        type: 'iot_simulation_interval',
                        error: intervalError.toString(),
                        stack: intervalError.stack,
                        timestamp: new Date().toISOString()
                    };
                    
                    if (window.errorHandler) {
                        window.errorHandler.logError(errorInfo);
                    }
                }
            }, 2500);

            // Validate interval was created successfully
            if (!this.iotInterval || typeof this.iotInterval !== 'number') {
                throw new Error('Failed to create IoT simulation interval');
            }

            console.log('IoT simulation interval started (2.5s)');

        } catch (error) {
            console.error('Error in initIoTSimulation:', error);
            
            // Show user-friendly notification (non-critical)
            if (window.notificationManager) {
                window.notificationManager.show('IoT simulation could not be started', 'warning', 3000);
            }

            // Log detailed error for debugging
            const errorInfo = {
                type: 'init_iot_simulation',
                error: error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };
            
            if (window.errorHandler) {
                window.errorHandler.logError(errorInfo);
            }

            // Attempt fallback: create static IoT display
            try {
                const logs = document.getElementById('iot-logs');
                if (logs && logs instanceof HTMLElement) {
                    logs.innerHTML = `
                        <div class="flex justify-between items-center text-gray-400">
                            <span class="text-neon-green">[${new Date().toLocaleTimeString()}]</span>
                            <span class="flex-1 mx-2">System Ready</span>
                            <span class="text-xs text-gray-600">init</span>
                        </div>
                    `;
                    
                    // Set default sensor values
                    const tempEl = document.getElementById('iot-temp');
                    const humidityEl = document.getElementById('iot-humidity');
                    const energyEl = document.getElementById('iot-energy');
                    
                    if (tempEl) tempEl.textContent = '22.5°C';
                    if (humidityEl) humidityEl.textContent = '65%';
                    if (energyEl) energyEl.textContent = '2.8kW';
                    
                    console.log('Applied fallback IoT simulation');
                }
            } catch (fallbackError) {
                console.error('IoT simulation fallback failed:', fallbackError);
            }
        }
    }

    updateSensorValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.textContent = value;
                element.style.opacity = '1';
            }, 150);
        }
    }

    // ==================== PARTICLES ====================

    initParticles() {
        try {
            const container = document.getElementById('particles-container');
            if (!container) {
                console.warn('Particles container not found in DOM');
                return;
            }

            // Validate container is a valid DOM element
            if (!(container instanceof HTMLElement)) {
                throw new Error('Particles container is not a valid DOM element');
            }

            // Calculate particle count based on screen size
            let particleCount;
            try {
                if (typeof window.innerWidth !== 'number') {
                    throw new Error('window.innerWidth is not available');
                }
                particleCount = window.innerWidth < 768 ? 25 : 50;
                
                if (typeof particleCount !== 'number' || particleCount <= 0) {
                    throw new Error('Invalid particle count calculated');
                }
            } catch (countError) {
                console.warn('Error calculating particle count, using default:', countError);
                particleCount = 30; // Safe fallback
            }

            // Clear existing particles to prevent duplicates
            try {
                container.innerHTML = '';
            } catch (clearError) {
                console.warn('Error clearing particles container:', clearError);
            }

            // Create particles
            let successfulParticles = 0;
            for (let i = 0; i < particleCount; i++) {
                try {
                    const particle = document.createElement('div');
                    if (!particle) {
                        throw new Error('Failed to create particle element');
                    }

                    particle.className = 'particle';
                    
                    // Set particle styles with validation
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const animationDelay = Math.random() * 10;
                    const animationDuration = 10 + Math.random() * 20;
                    const opacity = Math.random() * 0.5 + 0.2;

                    // Validate generated values
                    if (left < 0 || left > 100 || top < 0 || top > 100) {
                        throw new Error('Invalid particle position values generated');
                    }
                    if (animationDelay < 0 || animationDuration <= 0) {
                        throw new Error('Invalid particle animation values generated');
                    }
                    if (opacity < 0 || opacity > 1) {
                        throw new Error('Invalid particle opacity value generated');
                    }

                    particle.style.left = left + '%';
                    particle.style.top = top + '%';
                    particle.style.animationDelay = animationDelay + 's';
                    particle.style.animationDuration = animationDuration + 's';
                    particle.style.opacity = opacity;

                    container.appendChild(particle);
                    successfulParticles++;

                } catch (particleError) {
                    console.warn(`Error creating particle ${i}:`, particleError);
                    // Continue with next particle
                }
            }

            // Log success information
            console.log(`Successfully created ${successfulParticles}/${particleCount} particles`);

            // Validate final result
            if (successfulParticles === 0) {
                throw new Error('No particles were successfully created');
            }
            
            // Add mouse interaction (Parallax Effect)
            document.addEventListener('mousemove', (e) => {
                try {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    const particles = document.querySelectorAll('.particle');
                    particles.forEach((particle, index) => {
                        const speed = (index % 5) + 1;
                        const x = (window.innerWidth - e.pageX * speed) / 100;
                        const y = (window.innerHeight - e.pageY * speed) / 100;
                        
                        particle.style.transform = `translateX(${x}px) translateY(${y}px)`;
                    });
                } catch (moveError) {
                    // Ignore move errors to prevent console spam
                }
            });

        } catch (error) {
            console.error('Error in initParticles:', error);
            
            // Show user-friendly notification (non-critical)
                if (window.notificationManager) {
                    window.notificationManager.show('Visual effects could not be fully loaded', 'warning', 3000);
                }

            // Log detailed error for debugging
            const errorInfo = {
                type: 'init_particles',
                error: error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString(),
                windowWidth: window.innerWidth,
                userAgent: navigator.userAgent
            };
            
            if (window.errorHandler) {
                window.errorHandler.logError(errorInfo);
            }

            // Attempt fallback: create minimal particles
            try {
                const container = document.getElementById('particles-container');
                if (container && container instanceof HTMLElement) {
                    container.innerHTML = '';
                    
                    // Create just 5 simple particles as fallback
                    for (let i = 0; i < 5; i++) {
                        const particle = document.createElement('div');
                        particle.className = 'particle';
                        particle.style.left = (Math.random() * 100) + '%';
                        particle.style.top = (Math.random() * 100) + '%';
                        particle.style.opacity = '0.3';
                        container.appendChild(particle);
                    }
                    console.log('Created fallback particles');
                }
            } catch (fallbackError) {
                console.error('Fallback particle creation failed:', fallbackError);
            }
        }
    }

    // ==================== STATS ANIMATION ====================

    updateStats() {
        try {
            // Validate that setInterval is available
            if (typeof setInterval !== 'function') {
                throw new Error('setInterval is not available');
            }

            this.statsInterval = setInterval(() => {
                try {
                    const agentsEl = document.getElementById('stat-agents');
                    const iotEl = document.getElementById('stat-iot');
                    
                    // Update agents count
                    if (agentsEl) {
                        try {
                            const currentText = agentsEl.textContent;
                            if (typeof currentText !== 'string') {
                                throw new Error('Agents element text content is not a string');
                            }
                            
                            const currentAgents = parseInt(currentText.replace(/,/g, ''));
                            if (isNaN(currentAgents)) {
                                throw new Error('Failed to parse current agents count');
                            }
                            
                            const increment = Math.floor(Math.random() * 3);
                            if (isNaN(increment)) {
                                throw new Error('Failed to generate random increment');
                            }
                            
                            const newCount = currentAgents + increment;
                            if (isNaN(newCount)) {
                                throw new Error('Failed to calculate new agents count');
                            }
                            
                            agentsEl.textContent = newCount.toLocaleString();
                            
                        } catch (agentsError) {
                            console.warn('Error updating agents count:', agentsError);
                            // Continue with IoT update
                        }
                    }
                    
                    // Update IoT count
                    if (iotEl) {
                        try {
                            const currentText = iotEl.textContent;
                            if (typeof currentText !== 'string') {
                                throw new Error('IoT element text content is not a string');
                            }
                            
                            const currentIot = parseInt(currentText.replace(/,/g, ''));
                            if (isNaN(currentIot)) {
                                throw new Error('Failed to parse current IoT count');
                            }
                            
                            const increment = Math.floor(Math.random() * 10);
                            if (isNaN(increment)) {
                                throw new Error('Failed to generate random increment');
                            }
                            
                            const newCount = currentIot + increment;
                            if (isNaN(newCount)) {
                                throw new Error('Failed to calculate new IoT count');
                            }
                            
                            iotEl.textContent = newCount.toLocaleString();
                            
                        } catch (iotError) {
                            console.warn('Error updating IoT count:', iotError);
                            // Continue execution
                        }
                    }
                    
                } catch (intervalError) {
                    console.error('Error in stats update interval:', intervalError);
                    
                    // Log error for debugging
                    const errorInfo = {
                        type: 'stats_update_interval',
                        error: intervalError.toString(),
                        stack: intervalError.stack,
                        timestamp: new Date().toISOString()
                    };
                    
                    if (window.errorHandler) {
                        window.errorHandler.logError(errorInfo);
                    }
                }
            }, 5000);

            // Validate interval was created successfully
            if (!this.statsInterval || typeof this.statsInterval !== 'number') {
                throw new Error('Failed to create stats update interval');
            }

            console.log('Stats update interval started (5s)');

        } catch (error) {
            console.error('Error in updateStats:', error);
            
            // Show user-friendly notification (non-critical)
            if (window.notificationManager) {
                window.notificationManager.show('Update statistik tidak dapat dijalankan', 'warning', 3000);
            }

            // Log detailed error for debugging
            const errorInfo = {
                type: 'update_stats',
                error: error.toString(),
                stack: error.stack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };
            
            if (window.errorHandler) {
                window.errorHandler.logError(errorInfo);
            }

            // Attempt fallback: manual stats update
            try {
                const agentsEl = document.getElementById('stat-agents');
                const iotEl = document.getElementById('stat-iot');
                
                if (agentsEl) {
                    agentsEl.textContent = '1,234';
                }
                if (iotEl) {
                    iotEl.textContent = '5,678';
                }
                
                console.log('Applied fallback stats values');
                
            } catch (fallbackError) {
                console.error('Stats fallback failed:', fallbackError);
            }
        }
    }

    // ==================== VR/AR MODE ====================

    toggleVR() {
        const overlay = document.getElementById('vr-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden');
            document.body.style.overflow = overlay.classList.contains('hidden') ? '' : 'hidden';
        }
    }

    enterAR() {
        this.showNotification('Memulai WebXR Session...', 'info');
        
        setTimeout(() => {
            this.showNotification('AR Mode Aktif - Scanning environment...', 'success');
        }, 2000);
        
        setTimeout(() => {
            this.showNotification('Spatial anchor locked. 3D visualization ready.', 'success');
        }, 4000);
    }

    // ==================== NOTIFICATIONS ====================

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const colors = {
            info: 'border-neon-blue/30',
            success: 'border-neon-green/30',
            warning: 'border-yellow-400/30',
            error: 'border-red-500/30'
        };

        const icons = {
            info: 'fa-info-circle text-neon-blue',
            success: 'fa-check-circle text-neon-green',
            warning: 'fa-exclamation-triangle text-yellow-400',
            error: 'fa-times-circle text-red-500'
        };

        const notif = document.createElement('div');
        notif.className = `notification glass-panel px-6 py-4 rounded-xl border ${colors[type]} animate-glow`;
        notif.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas ${icons[type]}"></i>
                <span class="font-medium">${message}</span>
            </div>
        `;
        
        container.appendChild(notif);
        
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(100px)';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // ==================== UTILITY METHODS ====================

    scrollToAgents() {
        document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' });
    }

    toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    initSearch() {
        const searchInput = document.getElementById('agent-search');
        if (!searchInput) return;

        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.renderAgents(this.currentFilter, e.target.value);
            }, 300);
        });
    }

    initEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterAgents(btn.dataset.filter);
            });
        });

        // Close modal on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeRecruitModal();
                const vrOverlay = document.getElementById('vr-overlay');
                if (vrOverlay && !vrOverlay.classList.contains('hidden')) {
                    this.toggleVR();
                }
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-black/50');
                } else {
                    navbar.classList.remove('bg-black/50');
                }
            }
        });

        // Chat input robust listeners
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => this.handleChatKeypress(e));
        }
        const sendBtn = document.getElementById('chat-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // IoT device click handlers
        document.querySelectorAll('.iot-device').forEach(device => {
            device.addEventListener('click', () => {
                const deviceType = device.dataset.device;
                const deviceNames = {
                    home: 'Smart Home Hub',
                    industrial: 'Industrial IoT',
                    fleet: 'Autonomous Fleet'
                };
                this.showNotification(`${deviceNames[deviceType]} - Detail view opened`, 'info');
            });
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe agent cards
        document.querySelectorAll('.agent-card').forEach(card => {
            // card.style.opacity = '0'; // Removed to prevent visibility issues
            observer.observe(card);
        });

        // Observe stat cards
        document.querySelectorAll('.stat-card').forEach(card => {
            // card.style.opacity = '0'; // Removed to prevent visibility issues
            observer.observe(card);
        });
    }

    // ==================== CLEANUP ====================

    destroy() {
        if (this.iotInterval) clearInterval(this.iotInterval);
        if (this.statsInterval) clearInterval(this.statsInterval);
    }
}

// Initialize Application
var app = new COGNODEApp();
window.app = app;
// Global proxies for inline HTML handlers
window.sendMessageProxy = () => { try { window.app && window.app.sendMessage(); } catch(e){} };
window.handleChatKeypressProxy = (e) => { try { window.app && window.app.handleChatKeypress(e); } catch(e){} };
window.quickReplyProxy = (t) => { try { window.app && window.app.quickReply(t); } catch(e){} };

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    app.destroy();
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        app.destroy();
    } else {
        app.init();
    }
});

// Enhanced Loading System
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingBar = document.getElementById('loading-bar');
        
        // Quick start: hide loading screen immediately if in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Development mode detected - using fast loading');
            this.quickLoad();
        } else {
            this.init();
        }
        
        // Expose hide method globally for emergency use
        window.hideLoadingScreen = () => {
            console.log('Emergency loading screen hide triggered');
            this.hideLoading();
        };
    }
    
    quickLoad() {
        // Fast loading for development
        console.log('Using quick load for development...');
        this.updateProgress(100, 'Ready!');
        setTimeout(() => {
            console.log('Hiding loading screen (quick mode)');
            this.hideLoading();
        }, 100);
        this.setupIntersectionObserver();
        console.log('Quick loading completed');
    }

    init() {
        try {
            this.simulateLoading();
            this.setupIntersectionObserver();
            
            // Safety timeout: hide loading screen after 5 seconds maximum
            setTimeout(() => {
                if (this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
                    console.warn('Loading screen timeout reached, forcing hide');
                    this.hideLoading();
                }
            }, 5000);
            
        } catch (error) {
            console.error('LoadingManager initialization error:', error);
            this.hideLoading(); // Force hide on error
        }
    }

    simulateLoading() {
        const steps = [
            { progress: 25, text: 'Loading Web 4.0 Core...' },
            { progress: 50, text: 'Initializing AI Agents...' },
            { progress: 75, text: 'Connecting IoT Devices...' },
            { progress: 100, text: 'COGNODE Ready!' }
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                this.updateProgress(step.progress, step.text);
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => this.hideLoading(), 200);
            }
        }, 300);
    }

    updateProgress(progress, text) {
        if (this.loadingBar) {
            this.loadingBar.style.width = `${progress}%`;
            this.loadingBar.classList.add('loading-progress');
        }
        
        const loadingText = document.querySelector('#loading-screen .text-gray-400');
        if (loadingText) {
            loadingText.textContent = text;
        }
    }

    hideLoading() {
        try {
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
                console.log('Loading screen hidden successfully');
            } else {
                console.warn('Loading screen element not found');
            }
        } catch (error) {
            console.error('Error hiding loading screen:', error);
            // Fallback: try to find and hide loading screen by ID
            try {
                const fallbackLoadingScreen = document.getElementById('loading-screen');
                if (fallbackLoadingScreen) {
                    fallbackLoadingScreen.style.display = 'none';
                    document.body.style.overflow = '';
                    console.log('Loading screen hidden using fallback method');
                }
            } catch (fallbackError) {
                console.error('Fallback hide method also failed:', fallbackError);
            }
        }
    }

    setupIntersectionObserver() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Notification System
class NotificationManager {
    constructor() {
        this.container = document.getElementById('notification-container');
        this.notifications = new Map();
    }

    show(message, type = 'info', duration = 3000) {
        const id = Date.now();
        const notification = this.createNotification(id, message, type);
        
        this.container.appendChild(notification);
        this.notifications.set(id, notification);

        // Auto remove
        setTimeout(() => this.remove(id), duration);

        return id;
    }

    createNotification(id, message, type) {
        const notification = document.createElement('div');
        notification.className = `notification glass-panel rounded-lg p-4 border-l-4 transform transition-all duration-300 translate-x-full`;
        notification.dataset.id = id;

        const colors = {
            success: 'border-neon-green text-neon-green',
            error: 'border-red-500 text-red-500',
            warning: 'border-yellow-500 text-yellow-500',
            info: 'border-neon-blue text-neon-blue'
        };

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        notification.className += ` ${colors[type] || colors.info}`;

        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas ${icons[type] || icons.info}"></i>
                <span class="text-sm font-medium">${message}</span>
                <button onclick="notificationManager.remove(${id})" class="ml-auto text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        return notification;
    }

    remove(id) {
        const notification = this.notifications.get(id);
        if (notification) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
                this.notifications.delete(id);
            }, 300);
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            memory: 0,
            latency: 0
        };
        this.init();
    }

    init() {
        this.startFPSMonitoring();
        this.startMemoryMonitoring();
        this.startLatencyMonitoring();
    }

    startFPSMonitoring() {
        let lastTime = performance.now();
        let frameCount = 0;

        const updateFPS = () => {
            const currentTime = performance.now();
            const deltaTime = currentTime - lastTime;
            
            if (deltaTime >= 1000) {
                this.metrics.fps = Math.round((frameCount * 1000) / deltaTime);
                frameCount = 0;
                lastTime = currentTime;
            }
            
            frameCount++;
            requestAnimationFrame(updateFPS);
        };

        updateFPS();
    }

    startMemoryMonitoring() {
        if (performance.memory) {
            setInterval(() => {
                this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1048576); // Convert to MB
            }, 1000);
        }
    }

    startLatencyMonitoring() {
        setInterval(() => {
            const start = performance.now();
            setTimeout(() => {
                this.metrics.latency = performance.now() - start - 1000; // Subtract the timeout duration
            }, 0);
        }, 1000);
    }

    getMetrics() {
        return { ...this.metrics };
    }
}

// Enhanced Scroll System
class ScrollEnhancements {
    constructor() {
        this.backToTopButton = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        this.setupBackToTop();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
    }

    setupBackToTop() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.backToTopButton.classList.remove('opacity-0', 'invisible');
                this.backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                this.backToTopButton.classList.add('opacity-0', 'invisible');
                this.backToTopButton.classList.remove('opacity-100', 'visible');
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.feature-card, .agent-card, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Error Handling System
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxErrors = 50;
        this.init();
    }

    init() {
        // Global error handlers
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
        
        // Network error handler
        window.addEventListener('offline', () => this.handleOffline());
        window.addEventListener('online', () => this.handleOnline());
        
        // Resource loading errors
        document.addEventListener('error', (e) => this.handleResourceError(e), true);
        
        console.log('🛡️ Error Handler initialized');
    }

    handleError(event) {
        const errorInfo = {
            type: 'javascript',
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error?.toString(),
            stack: event.error?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.logError(errorInfo);
        this.showErrorNotification(this.getUserFriendlyMessage(errorInfo));
        
        // Prevent default error handling
        event.preventDefault();
    }

    handlePromiseRejection(event) {
        const errorInfo = {
            type: 'promise',
            message: event.reason?.message || 'Unhandled Promise Rejection',
            error: event.reason?.toString(),
            stack: event.reason?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.logError(errorInfo);
        this.showErrorNotification('Terjadi kesalahan pada sistem. Sedang memperbaiki...');
        
        event.preventDefault();
    }

    handleResourceError(event) {
        if (event.target && (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
            const errorInfo = {
                type: 'resource',
                resource: event.target.tagName,
                src: event.target.src || event.target.href,
                timestamp: new Date().toISOString()
            };

            this.logError(errorInfo);
            console.warn('Resource loading error:', errorInfo);
        }
    }

    handleOffline() {
        this.showErrorNotification('🔴 Koneksi terputus. Mode offline diaktifkan.', 'warning', 0);
        
        // Try to enable offline mode for critical features
        if (window.app && window.app.enableOfflineMode) {
            window.app.enableOfflineMode();
        }
    }

    handleOnline() {
        window.notificationManager.show('🟢 Koneksi tersambung kembali!', 'success', 3000);
        
        // Try to sync any offline data
        if (window.app && window.app.syncOfflineData) {
            window.app.syncOfflineData();
        }
    }

    logError(errorInfo) {
        this.errorLog.push(errorInfo);
        
        // Keep only recent errors
        if (this.errorLog.length > this.maxErrors) {
            this.errorLog = this.errorLog.slice(-this.maxErrors);
        }

        // Log to console for debugging
        console.group('🚨 Error Captured');
        console.error('Error Details:', errorInfo);
        console.groupEnd();

        // Send to external logging service if available
        this.sendToLoggingService(errorInfo);
    }

    sendToLoggingService(errorInfo) {
        // Simulate sending to external service
        // In production, this would send to services like Sentry, LogRocket, etc.
        if (window.DEBUG_MODE) {
            console.log('📤 Sending error to logging service:', errorInfo);
        }
    }

    getUserFriendlyMessage(errorInfo) {
        const errorMessages = {
            'TypeError': 'Terjadi kesalahan tipe data. Sedang memperbaiki...',
            'ReferenceError': 'Referensi tidak ditemukan. Sedang memuat ulang...',
            'SyntaxError': 'Kesalahan sintaks terdeteksi. Memvalidasi data...',
            'NetworkError': 'Kesalahan jaringan. Mencoba kembali...',
            'SecurityError': 'Masalah keamanan terdeteksi. Memvalidasi...',
            'default': 'Terjadi kesalahan tak terduga. Sedang memperbaiki...'
        };

        const errorType = errorInfo.message?.split(':')[0] || 'default';
        return errorMessages[errorType] || errorMessages.default;
    }

    showErrorNotification(message, type = 'error', duration = 5000) {
        if (window.notificationManager) {
            window.notificationManager.show(message, type, duration);
        } else {
            // Fallback to console if notification system is not available
            console.error('Error:', message);
        }
    }

    getErrorReport() {
        return {
            totalErrors: this.errorLog.length,
            recentErrors: this.errorLog.slice(-10),
            browser: window.utils.getBrowserInfo(),
            platform: navigator.platform,
            timestamp: new Date().toISOString()
        };
    }

    clearErrorLog() {
        this.errorLog = [];
        window.notificationManager.show('🗑️ Riwayat error telah dibersihkan', 'info', 3000);
    }

    // Recovery methods
    attemptRecovery() {
        console.log('🔄 Attempting error recovery...');
        
        // Reload critical components
        if (window.app) {
            try {
                window.app.destroy();
                setTimeout(() => window.app.init(), 1000);
                this.showErrorNotification('🔄 Sistem sedang dipulihkan...', 'info', 3000);
            } catch (error) {
                console.error('Recovery failed:', error);
                this.showErrorNotification('❌ Pemulihan gagal. Silakan refresh halaman.', 'error', 0);
            }
        }
    }
}

// 3D Tilt Effect
class Tilt3D {
    constructor() {
        this.init();
    }

    init() {
        // Re-query cards in case of dynamic content
        const cards = document.querySelectorAll('.agent-card, .feature-card, .stat-card');
        cards.forEach(card => {
            if (card.dataset.tiltInitialized) return;
            
            card.classList.add('tilt-card');
            card.dataset.tiltInitialized = 'true';
            
            // Add content wrapper if not exists for better 3D effect
            // Note: We need to be careful not to break event listeners or layout
            // For now, we'll apply tilt to the card itself without wrapping content
            
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

    }
}

// System Terminal
class SystemTerminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.inputDisplay = document.getElementById('terminal-input-display');
        this.currentInput = '';
        
        if (this.output && this.inputDisplay) {
            this.init();
        }
    }
    
    init() {
        // Use a flag to track if terminal is active to avoid capturing all keys globally
        this.isActive = false;
        
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
            terminalWindow.addEventListener('click', () => {
                this.isActive = true;
                terminalWindow.style.borderColor = 'var(--neon-blue)';
            });
            
            document.addEventListener('click', (e) => {
                if (!terminalWindow.contains(e.target)) {
                    this.isActive = false;
                    terminalWindow.style.borderColor = 'var(--neon-green)';
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (!this.isActive) return;
            this.handleInput(e);
        });
        
        // Auto-type some intro text
        setTimeout(() => this.typeLine('System checks complete... OK', 'text-neon-green'), 1000);
        setTimeout(() => this.typeLine('Connecting to neural network... OK', 'text-neon-green'), 2000);
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            this.executeCommand();
        } else if (e.key === 'Backspace') {
            this.currentInput = this.currentInput.slice(0, -1);
            this.updateDisplay();
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            this.currentInput += e.key;
            this.updateDisplay();
        }
        // Prevent default behavior for some keys to avoid scrolling etc.
        if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
            // e.preventDefault(); // Optional
        }
    }
    
    updateDisplay() {
        this.inputDisplay.textContent = this.currentInput;
    }
    
    executeCommand() {
        const cmd = this.currentInput.trim().toLowerCase();
        
        // Insert before the input line
        const inputLine = document.querySelector('.terminal-input-line');
        const cmdLog = document.createElement('div');
        cmdLog.className = 'terminal-line mb-1';
        cmdLog.innerHTML = `<span class="text-neon-blue">user@cognode:~$</span> ${this.currentInput}`;
        this.output.insertBefore(cmdLog, inputLine);
        
        this.currentInput = '';
        this.updateDisplay();
        
        if (cmd) {
            this.processCommand(cmd);
        }
        
        // Scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    processCommand(cmd) {
        const inputLine = document.querySelector('.terminal-input-line');
        
        const log = (text, color = 'text-neon-green') => {
            const div = document.createElement('div');
            div.className = `terminal-line ${color}`;
            div.textContent = text;
            this.output.insertBefore(div, inputLine);
        };

        switch(cmd) {
            case 'help':
                log('Available commands: help, status, agents, clear, date, version, hack');
                break;
            case 'status':
                log('System Status: ONLINE', 'text-neon-green');
                log('CPU Load: 12% | Memory: 34%', 'text-neon-blue');
                log('Network: Secure (Encrypted)', 'text-neon-purple');
                break;
            case 'agents':
                log('Active Agents: 6', 'text-neon-purple');
                log('- Neura-X Prime (Productivity)', 'pl-4');
                log('- Aura (Creative)', 'pl-4');
                log('- Sync (IoT)', 'pl-4');
                break;
            case 'clear':
                // Remove all lines except the last one (input line)
                const children = Array.from(this.output.children);
                children.forEach(child => {
                    if (!child.classList.contains('terminal-input-line')) {
                        child.remove();
                    }
                });
                break;
            case 'date':
                log(new Date().toString());
                break;
            case 'version':
                log('COGNODE Platform v4.0.2 (Build 2026.03.02)');
                break;
            case 'hack':
                log('Initiating brute force attack...', 'text-red-500');
                setTimeout(() => log('Access Denied. Security Protocol Omega activated.', 'text-red-500'), 1000);
                break;
            default:
                log(`Command not found: ${cmd}. Type 'help' for list.`, 'text-red-500');
        }
    }
    
    typeLine(text, className = '') {
        const inputLine = document.querySelector('.terminal-input-line');
        const div = document.createElement('div');
        div.className = `terminal-line ${className}`;
        div.textContent = text;
        if (inputLine) {
            this.output.insertBefore(div, inputLine);
        } else {
            this.output.appendChild(div);
        }
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// Initialize Enhanced Systems
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM Content Loaded - Initializing systems...');
        
        // Initialize loading manager first
        // window.loadingManager = new LoadingManager();
        
        // Initialize notification system
        window.notificationManager = new NotificationManager();
        
        // Initialize performance monitor
        window.performanceMonitor = new PerformanceMonitor();
        
        // Initialize scroll enhancements
        window.scrollEnhancements = new ScrollEnhancements();
        
        // Initialize error handler
        window.errorHandler = new ErrorHandler();
        
        // Initialize 3D Tilt Effect (skip in performance mode)
        if (!(window.app && window.app.performanceMode)) {
            window.tilt3d = new Tilt3D();
        }
        
        // Initialize System Terminal
        window.systemTerminal = new SystemTerminal();
        
        // Override app notification method
        if (window.app) {
            const originalShowNotification = window.app.showNotification;
            window.app.showNotification = function(message, type) {
                window.notificationManager.show(message, type || 'info');
            };
        }
        
        // Show welcome notification after loading
        setTimeout(() => {
            if (window.notificationManager) {
                window.notificationManager.show('🚀 COGNODE Web 4.0 Platform siap digunakan!', 'success', 5000);
                
                // Show browser compatibility info
                const browser = window.utils.getBrowserInfo();
                if (browser !== 'Chrome' && browser !== 'Edge') {
                    window.notificationManager.show(`⚡ Untuk performa optimal, gunakan Chrome atau Edge. Browser saat ini: ${browser}`, 'warning', 8000);
                }
                
                // Check WebXR support
                if (window.utils.supportsWebXR()) {
                    window.notificationManager.show('🥽 WebXR terdeteksi! Mode AR/VR tersedia.', 'info', 4000);
                }
            }
        }, 1000);
        
        console.log('All systems initialized successfully');
        
    } catch (error) {
        console.error('Error during system initialization:', error);
        // Force hide loading screen on critical error
        try {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = '';
            }
        } catch (hideError) {
            console.error('Failed to hide loading screen:', hideError);
        }
    }
    
    // Update performance stats
    setInterval(() => {
        const metrics = window.performanceMonitor.getMetrics();
        const fpsElement = document.getElementById('fps-counter');
        const memoryElement = document.getElementById('memory-usage');
        const latencyElement = document.getElementById('latency-ms');
        
        if (fpsElement) fpsElement.textContent = metrics.fps;
        if (memoryElement) memoryElement.textContent = metrics.memory;
        if (latencyElement) latencyElement.textContent = Math.abs(Math.round(metrics.latency));
    }, 1000);
});

// Enhanced Utility Functions
window.utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    isMobile: () => window.innerWidth <= 768,
    
    isTouchDevice: () => 'ontouchstart' in window,
    
    supportsWebXR: () => 'xr' in navigator,
    
    getBrowserInfo: () => {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        
        if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
        else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
        else if (ua.indexOf('Safari') > -1) browser = 'Safari';
        else if (ua.indexOf('Edge') > -1) browser = 'Edge';
        
        return browser;
    }
};
});
