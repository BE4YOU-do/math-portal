const FLASHCARDS_BY_COURSE = {
            'mat204_grup': [
                { category: 'Diedral Grup D₄', prompt: 'Diedral grupta $s \cdot r^k$ ifadesini $r$ ve $s$ cinsinden nasıl yazarsın?', answer: '$$s \cdot r^k = r^{-k} \cdot s$$ (Yansıma dönüşün üssünü tersine çevirir!)' },
                { category: 'Modüler Aritmetik', prompt: '$\mathbb{Z}_n$ grubunda bir $\bar{a}$ elemanının çarpımsal tersinin olması için gerek ve yeter şart nedir?', answer: '$$\operatorname{pgcd}(a, n) = 1$$ (Yani $a$ ile $n$ aralarında asal olmalıdır).' },
                { category: 'Devirli Gruplar', prompt: '$\mathbb{Z}_n$ grubunda $\bar{a}$ elemanının mertebesi $o(\bar{a})$ hangi formülle bulunur?', answer: '$$o(\bar{a}) = \frac{n}{\operatorname{pgcd}(a, n)}$$' },
                { category: 'Devirli Gruplar', prompt: '$\mathbb{Z}_n$ devirli grubunun toplam kaç tane üreteci (générateur) vardır?', answer: '$$\varphi(n) \quad \text{(Euler Phi fonksiyonu)}$$' },
                { category: 'Permütasyonlar', prompt: 'Uzunluğu $k$ olan bir döngünün (cycle) imzası $\varepsilon(c)$ kaçtır?', answer: '$$\varepsilon(c) = (-1)^{k-1}$$ (Uzunluk tek ise $+1$, çift ise $-1$!)' },
                { category: 'Permütasyonlar', prompt: 'Ayrık döngülerin çarpımı olan bir permütasyonun mertebesi nasıl bulunur?', answer: 'Döngü uzunluklarının EKOK\'u ile: $$o(\sigma) = \operatorname{ppcm}(l_1, l_2, \dots, l_r)$$' },
                { category: 'Grup Aksiyomları', prompt: 'Genel bir grupta $(ab)^{-1}$ neye eşittir? Hangi durumda $a^{-1}b^{-1}$ olur?', answer: 'Genel kural: $$(ab)^{-1} = b^{-1}a^{-1}$$ Sadece grup **Abelyen** ise $a^{-1}b^{-1}$ olur.' },
                { category: 'Temel Teoremler', prompt: '$g$ elemanının mertebesi $m$ ise, $g^n = e$ olması neyi gerektirir?', answer: '$$g^n = e \iff m \mid n$$ (Kuvvet, mertebenin tam katı olmalıdır).' },
                { category: 'Diedral Grup D₄', prompt: '$\mathcal{D}_4$ grubunun merkezi $Z(\mathcal{D}_4)$ hangi elemanlardan oluşur?', answer: '$$Z(\mathcal{D}_4) = \{e, r^2\} \quad \text{(Birim ve 180 derece dönüş)}$$' },
                { category: 'Grup Morfizmleri', prompt: '$\phi : G \to H$ bir grup morfizması ise $\phi(e_G)$ ve $\phi(x^{-1})$ neye eşittir?', answer: '$$\phi(e_G) = e_H \quad \text{ve} \quad \phi(x^{-1}) = [\phi(x)]^{-1}$$' }
            ],
            'mat201_seriler': [
                { category: 'Geometrik Seri', prompt: '$\sum_{n=0}^\infty q^n$ geometrik serisi hangi şart altında yakınsar ve toplamı nedir?', answer: '$$|q| < 1 \iff \sum_{n=0}^\infty q^n = \frac{1}{1-q}$$' },
                { category: 'Genel Terim Testi', prompt: '$\lim_{n \to \infty} u_n = 0$ olması serinin yakınsaklığı için yeterli midir?', answer: '**HAYIR!** Yalnızca gerek şarttır. Örneğin harmonik seri $u_n = 1/n \to 0$ fakat $\sum 1/n = +\infty$ ıraksar.' },
                { category: 'Riemann Serileri', prompt: '$\sum_{n=1}^\infty \frac{1}{n^\alpha}$ Riemann serisi ne zaman yakınsar?', answer: '$$\alpha > 1 \iff \text{Yakınsak}, \quad \alpha \le 1 \iff \text{Iraksak}$$' },
                { category: 'D\'Alembert Testi', prompt: 'D\'Alembert testinde $\lim \frac{u_{n+1}}{u_n} = L$ ise sonuçlar nelerdir?', answer: '$L < 1$ ise kesin yakınsak, $L > 1$ ise ıraksak, $L = 1$ ise test **kararsızdır** (başka teste geç!).' },
                { category: 'Leibniz Kriteri', prompt: 'Alterne seri $\sum (-1)^n b_n$ için Leibniz şartları nelerdir?', answer: '1) $b_n \ge 0$, 2) Azalan ($b_{n+1} \le b_n$), 3) $\lim b_n = 0$. Kalan hatası $|R_n| \le b_{n+1}$.' },
                { category: 'Cauchy Kök Testi', prompt: '$\lim_{n \to \infty} \sqrt[n]{|u_n|} = L$ ise hangi durumlarda yakınsama sağlanır?', answer: '$L < 1$ ise mutlak yakınsak, $L > 1$ ise ıraksak, $L = 1$ ise test kararsızdır.' },
                { category: 'Düzgün Yakınsaklık', prompt: 'Fonksiyon dizisi $(f_n)$ limit $f$\'ye düzgün yakınsar ne demektir?', answer: '$$\lim_{n \to \infty} \sup_{x \in I} |f_n(x) - f(x)| = 0 \quad (\|f_n - f\|_\infty \to 0)$$' },
                { category: 'Süreklilik Aktarımı', prompt: 'Sürekli fonksiyonlar dizisi $f_n \in C^0$ hangi yakınsaklık altında sürekli bir limite gider?', answer: '**Düzgün Yakınsaklık (Convergence Uniforme)** şarttır. Noktasal yakınsaklık sürekliliği korumaz!' }
            ],
            'fiz101_fizik': [
                { category: 'Vektörler', prompt: 'İki vektör $\vec{A}$ ve $\vec{B}$ ne zaman birbirine diktir?', answer: '$$\vec{A} \cdot \vec{B} = 0 \iff \vec{A} \perp \vec{B}$$ (Skaler çarpım sıfırdır).' },
                { category: 'Poisson Bağıntısı', prompt: 'Dönen referans sisteminde bir birim vektörün zamana göre türevi nasıl ifade edilir?', answer: '$$\left(\frac{d\vec{u}}{dt}\right)_{R_0} = \vec{\Omega} \times \vec{u}$$ ($\vec{\Omega}$ açısal hız vektörüdür).' },
                { category: 'Frenet Tabanı', prompt: 'Frenet tabanında ivme vektörü $\vec{a}$ bileşenleri nelerdir?', answer: '$$\vec{a} = \frac{dv}{dt} \vec{T} + \frac{v^2}{\rho} \vec{N}$$ ($a_T$: teğetsel, $a_N$: normal merkezcil ivme).' },
                { category: 'Kutupsal Kinematik', prompt: 'Kutupsal koordinatlarda hız vektörü $\vec{v}$ nedir?', answer: '$$\vec{v} = \dot{r}\vec{u}_r + r\dot{\theta}\vec{u}_\theta$$' },
                { category: 'Merkezi Kuvvet', prompt: 'Merkezi bir kuvvet alanında ($\vec{F} = F(r)\vec{u}_r$) hangi fiziksel büyüklük kesinlikle korunur?', answer: 'Açısal momentum korunur: $$\vec{L} = \vec{r} \times m\vec{v} = \text{sabit}$$ (Hareket tek bir düzlemdedir).' },
                { category: 'Sürtünme Yasası', prompt: 'Statik sürtünme kuvveti $f_s$ yüzey tepkisi $N$ ile nasıl sınırlıdır?', answer: '$$f_s \le \mu_s N$$ (Kayma sınırında $f_{s,\max} = \mu_s N$).' }
            ],
            'mat206_olasilik': [
                { category: 'Laplace Modeli', prompt: 'Sonlu ve eş olası bir örneklem uzayında bir olayın olasılığı nasıl tanımlanır?', answer: '$$P(A) = \frac{|A|}{|\Omega|} = \frac{\text{İstenen Durum Sayısı}}{\text{Tüm Olası Durum Sayısı}}$$' },
                { category: 'Poincaré Formülü', prompt: 'İki olay $A$ ve $B$ için $P(A \cup B)$ nedir?', answer: '$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$' },
                { category: 'Koşullu Olasılık', prompt: '$P(B) > 0$ iken $B$ verildiğinde $A$\'nın koşullu olasılığı $P(A \mid B)$ nedir?', answer: '$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$' },
                { category: 'Toplam Olasılık', prompt: '$A_1, \dots, A_n$ bir ayrık parçalanış (partition) ise $P(B)$ formülü nedir?', answer: '$$P(B) = \sum_{i=1}^n P(A_i) P(B \mid A_i)$$' },
                { category: 'Bayes Teoremi', prompt: 'Bayes Teoremi formülü nedir?', answer: '$$P(A_k \mid B) = \frac{P(A_k) P(B \mid A_k)}{\sum_{i=1}^n P(A_i) P(B \mid A_i)}$$' }
            ]
        };
