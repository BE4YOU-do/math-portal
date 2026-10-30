const conceptsDB = {
    'identite_bezout': {
        course: 'mat204_grup',
        title: 'Identité de Bézout (Bézout Özdeşliği ve Teoremi)',
        definition: `Soient $a, b \\in \\mathbb{Z}$ deux entiers non tous deux nuls, et $d = \\operatorname{pgcd}(a, b)$.  
        Alors il existe deux entiers relatifs $u, v \\in \\mathbb{Z}$ (appelés coefficients de Bézout) tels que :
        $$\\mathbf{a \\cdot u + b \\cdot v = \\operatorname{pgcd}(a, b)}$$
        <strong>Théorème de Bézout (Inversibilité Modulaire) :</strong>  
        $a$ et $b$ sont premiers entre eux ($\\operatorname{pgcd}(a, b) = 1$) si et seulement si :
        $$\\mathbf{\\exists (u, v) \\in \\mathbb{Z}^2, \\quad a \\cdot u + b \\cdot v = 1}$$`,
        intuition: `Öklid algoritması tersten işletilerek kalanı 1 olan doğrusal eşitlik yazılır: $26u + 7v = 1$. Modulo 26 aritmetiğine geçildiğinde $26u \\equiv 0$ olacağından geriye $7v \\equiv 1$ kalır. Dolayısıyla $v$ katsayısı, $7$'nin mod 26'daki çarpımsal tersidir. $v$ negatif çıktığı takdirde üzerine modül (26) eklenerek pozitif denklik sınıfı elde edilir.`
    },
    'theoreme_gauss': {
        course: 'mat204_grup',
        title: 'Lemme de Gauss (Gauss Bölünebilme Lemması)',
        definition: `Soient $a, b, c \\in \\mathbb{Z}^*$. Si $a$ divise le produit $bc$ et si $a$ est premier avec $b$, alors $a$ divise $c$ :
        $$\\mathbf{\\left( a \\mid bc \\;\\text{ et }\\; \\gcd(a, b) = 1 \\right) \\implies a \\mid c}$$`,
        intuition: `İspatı Bézout özdeşliğinden 2 satırda çıkar: $\\gcd(a,b)=1 \\implies au + bv = 1$. Denklemi $c$ ile çarparsak $acu + bcv = c$ olur. $a \\mid acu$ ve $a \\mid bc \\implies a \\mid bcv$ olduğundan toplamları olan $c$'yi de tam böler!`
    },
    'element_inversible': {
        course: 'mat204_grup',
        title: 'Élément Inversible dans $\\mathbb{Z}_n$ ($U(n)$ Grubu)',
        definition: `Dans l'anneau $(\\mathbb{Z}_n, +, \\cdot)$, une classe d'équivalence $\\bar{a}$ admet un inverse multiplicatif (notée $\\bar{a} \\in U(n) = \\mathbb{Z}_n^\\times$) si et seulement si :
        $$\\mathbf{\\operatorname{pgcd}(a, n) = 1}$$
        Le groupe $(U(n), \\times)$ est un groupe abélien fini d'ordre $|U(n)| = \\varphi(n)$.`,
        intuition: `Bir $\\bar{a}$ sınıfının mod $n$'de çarpımsal tersinin bulunması, $a$ ile $n$'nin aralarında asal ($\\operatorname{pgcd}(a, n) = 1$) olmasına denktir. Ortak bölen varlığında $\\bar{a}$ sıfır bölenidir ve tersi yoktur.`
    },
    'groupe_abelien': {
        course: 'mat204_grup',
        title: 'Groupe Abélien (Değişmeli Grup Tanımı)',
        definition: `Un groupe $(G, \\star)$ est dit <strong>abélien</strong> (ou commutatif) si sa loi de composition interne vérifie :
        $$\\mathbf{\\forall x, y \\in G, \\quad x \\star y = y \\star x}$$`,
        intuition: `Grup elemanlarının işlem sırası değişmelidir (komütatiflik). Genel gruplarda ters eleman kuralı $(xy)^{-1} = y^{-1}x^{-1}$ (çorap-ayakkabı kuralı) şeklinde sıra değiştirirken, Abelyen gruplarda doğrudan $x^{-1}y^{-1}$ biçiminde yazılabilir.`
    },
    'groupe_klein_v4': {
        course: 'mat204_grup',
        title: 'Groupe de Klein $V_4 \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2$',
        definition: `Le groupe de Klein $V_4 = \\{e, a, b, c\\}$ est l'unique groupe (à isomorphisme près) d'ordre 4 qui <strong>n'est pas cyclique</strong>. Tous ses éléments non neutres sont d'ordre 2 :
        $$\\mathbf{a^2 = b^2 = c^2 = e, \\quad ab = ba = c, \\quad bc = cb = a, \\quad ca = ac = b}$$`,
        intuition: `Mertebesi 4 olan iki grup vardır: Devirli olan $\\mathbb{Z}_4$ (4 mertebeli üreteci var) ve devirli olmayan Klein 4-grubu $V_4 \\cong U(8) \\cong U(12)$ (birim dışındaki 3 elemanın da mertebesi 2'dir).`
    },
    'relation_diedrale': {
        course: 'mat204_grup',
        title: 'Relation de Commutation Diédrique dans $\\mathcal{D}_n$',
        definition: `Dans le groupe diédrique $\\mathcal{D}_n = \\langle r, s \\mid r^n = e, s^2 = e, srs = r^{-1} \\rangle$ d'ordre $2n$, la relation fondamentale reliant rotation ($r$) et réflexion ($s$) est :
        $$\\mathbf{s \\cdot r = r^{-1} \\cdot s \\iff s \\cdot r^k = r^{-k} \\cdot s = r^{n-k} \\cdot s \\quad (\\forall k \\in \\mathbb{Z})}$$`,
        intuition: `Geometrik olarak düzlem yansıtıldığında (yansıma $s$), dönme yönü tersine döner. Cebirsel ifadede $s$ elemanı sağa aktarılırken $r$ dönme elemanının kuvvetinin işareti tersine çevrilir ($s \\cdot r^k = r^{n-k} \\cdot s$).`
    },
    'centre_groupe': {
        course: 'mat204_grup',
        title: 'Centre d\'un Groupe $Z(G)$ (Grubun Merkezi)',
        definition: `Le centre d'un groupe $G$, noté $Z(G)$, est le sous-groupe normal formé des éléments qui commutent avec TOUS les éléments du groupe :
        $$\\mathbf{Z(G) = \\{ z \\in G \\mid \\forall g \\in G, \\, z \\cdot g = g \\cdot z \\}}$$`,
        intuition: `Grubun tüm elemanlarıyla değişmeli olan elemanların oluşturduğu normal alt gruptur. $G$ Abelyendir $\\iff Z(G) = G$. $\\mathcal{D}_4$ diedral grubunda yalnızca birim eleman $e$ ile $180^\\circ$ dönme $r^2$ tüm elemanlarla yer değiştirir: $Z(\\mathcal{D}_4) = \\{e, r^2\\}$.`
    },
    'centralisateur_element': {
        course: 'mat204_grup',
        title: 'Centralisateur d\'un Élément $C_G(a)$ (Merkezleyici)',
        definition: `Soit $a \\in G$ un élément fixé. Le centralisateur de $a$ dans $G$ est le sous-groupe des éléments de $G$ qui commutent avec $a$ :
        $$\\mathbf{C_G(a) = \\{ x \\in G \\mid xa = ax \\} \\le G}$$
        Le centre du groupe est l'intersection de tous les centralisateurs : $Z(G) = \\bigcap_{a \\in G} C_G(a)$.`,
        intuition: `$Z(G)$ tüm grup elemanlarıyla değişenleri toplarken, $C_G(a)$ yalnızca seçilen tek bir $a$ elemanıyla değişenleri toplar. Her zaman $Z(G) \\le C_G(a) \\le G$ kapsama zinciri geçerlidir.`
    },
    'ordre_element': {
        course: 'mat204_grup',
        title: 'Ordre d\'un Élément $o(g)$ (Elemanın Mertebesi)',
        definition: `L'ordre d'un élément $g \\in G$ est le plus petit entier strictement positif $m \\in \\mathbb{N}^*$ tel que :
        $$\\mathbf{g^m = e}$$
        Propriétés clés : $g^n = e \\iff o(g) \\mid n$, et $o(g^k) = \\frac{o(g)}{\\gcd(k, o(g))}$.  
        Dans $(\\mathbb{Z}_n, +)$, l'ordre d'une classe $\\bar{a}$ est : $\\mathbf{o(\\bar{a}) = \\frac{n}{\\operatorname{pgcd}(a, n)}}$.`,
        intuition: `Elemanın ardışık işlem sonucu birim elemana ulaştığı en küçük pozitif kuvvettir. Modüler devirli gruplarda grup mertebesinin EBOB'a oranı elemanın mertebesini verir.`
    },
    'indicatrice_euler': {
        course: 'mat204_grup',
        title: 'Indicatrice d\'Euler $\\varphi(n)$ (Üreteç Sayısı)',
        definition: `La fonction indicatrice d'Euler $\\varphi(n)$ compte le nombre d'entiers dans $\\{1, 2, \\dots, n\\}$ premiers avec $n$ :
        $$\\mathbf{\\varphi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)}$$
        Tout groupe cyclique d'ordre $n$ possède exactement $\\varphi(n)$ générateurs.`,
        intuition: `$\\mathbb{Z}_n$ devirli grubunun üreteç sayısı (ve aynı zamanda $U(n)$ grubunun mertebesi), $n$ ile aralarında asal ve $n$'den küçük pozitif tam sayıların sayısına ($\\varphi(n)$) eşittir.`
    },
    'theoreme_fermat': {
        course: 'mat204_grup',
        title: 'Théorème d\'Euler et Petit Théorème de Fermat',
        definition: `<strong>Théorème d'Euler :</strong> Pour tout entier $n \\ge 2$ et tout $a \\in \\mathbb{Z}$ tel que $\\gcd(a, n) = 1$ :
        $$\\mathbf{a^{\\varphi(n)} \\equiv 1 \\pmod n}$$
        <strong>Petit Théorème de Fermat :</strong> Si $p$ est premier et $p \\nmid a$, alors $\\mathbf{a^{p-1} \\equiv 1 \\pmod p}$.`,
        intuition: `Lagrange Teoremi'nin $(U(n), \\times)$ grubuna uygulanmasının doğrudan sonucudur: $|U(n)| = \\varphi(n)$ olduğundan her $\\bar{a} \\in U(n)$ için $\\bar{a}^{\\varphi(n)} = \\bar{1}$ olur.`
    },
    'theoreme_lagrange': {
        course: 'mat204_grup',
        title: 'Théorème de Lagrange (Alt Grup Mertebesi Bölünürlüğü)',
        definition: `Pour tout groupe fini $G$ et tout sous-groupe $H \\leq G$ :
        $$\\mathbf{|G| = [G : H] \\cdot |H| \\implies |H| \\text{ divise } |G|}$$
        <strong>Corollaires :</strong> (1) Pour tout $x \\in G$, $o(x) \\mid |G|$ et $x^{|G|} = e$. (2) Tout groupe d'ordre premier $p$ est cyclique ($G \\cong \\mathbb{Z}_p$).`,
        intuition: `Sonlu bir grupta sol yan kümeler ($xH$) grubu eşit boyutta ayrık parçalara (partition) böler. Dolayısıyla alt grubun eleman sayısı grubun eleman sayısını tam bölmek zorundadır.`
    },
    'cycles_disjoints': {
        course: 'mat204_grup',
        title: 'Cycles à Supports Disjoints (Ayrık Döngüler & Mertebe)',
        definition: `Toute permutation $\\sigma \\in \\mathcal{S}_n$ se décompose de manière unique (à l'ordre des facteurs près) en produit de cycles à supports deux à deux disjoints : $\\sigma = c_1 c_2 \\dots c_r$.  
        Des cycles disjoints commutent ($c_i c_j = c_j c_i$) et l'ordre de $\\sigma$ est :
        $$\\mathbf{o(\\sigma) = \\operatorname{ppcm}(\\ell(c_1), \\ell(c_2), \\dots, \\ell(c_r))}$$`,
        intuition: `Ayrık elemanları dönüştüren döngüler birbirini etkilemez ve değişmelidir. Bileşke permütasyonun mertebesi ise ayrık döngü uzunluklarının en küçük ortak katıdır (EKOK / PPCM).`
    },
    'signature_permutation': {
        course: 'mat204_grup',
        title: 'Signature $\\varepsilon(\\sigma)$ et Groupe Alterné $\\mathcal{A}_n$',
        definition: `La signature est l'unique morphisme surjectif $\\varepsilon : \\mathcal{S}_n \\to (\\{+1, -1\\}, \\times)$ vérifiant $\\varepsilon(\\tau) = -1$ pour toute transposition $\\tau$.  
        Pour un $k$-cycle $c$ : $\\mathbf{\\varepsilon(c) = (-1)^{k-1}}$.  
        Le noyau $\\mathbf{\\mathcal{A}_n = \\ker(\\varepsilon)}$ est le <strong>groupe alterné</strong> des permutations paires, sous-groupe normal d'ordre $n!/2$.`,
        intuition: `Döngü uzunluğu $k$ tek sayı ise imza $+1$ (çift permütasyon), $k$ çift sayı ise imza $-1$ (tek permütasyon) değerini alır. Çift permütasyonlar $\\mathcal{A}_n \\triangleleft \\mathcal{S}_n$ normal alt grubunu oluşturur.`
    },
    'morphisme_groupes': {
        course: 'mat204_grup',
        title: 'Morphisme de Groupes (İşlemi Koruyan Fonksiyon)',
        definition: `Une application $\\phi : (G, \\star) \\to (H, \\cdot)$ est un morphisme de groupes si :
        $$\\mathbf{\\forall x, y \\in G, \\quad \\phi(x \\star y) = \\phi(x) \\cdot \\phi(y)}$$
        Propriétés fondamentales : $\\phi(e_G) = e_H$, $\\phi(x^{-1}) = [\\phi(x)]^{-1}$, et $o(\\phi(x)) \\mid o(x)$.`,
        intuition: `İki farklı grup yapısı arasında işlemleri, birim elemanı ve ters alma işlemini muhafaza eden yapı koruyucu dönüşümdür.`
    },
    'noyau_image': {
        course: 'mat204_grup',
        title: 'Noyau ($\\ker f$) et Image ($\\operatorname{Im} f$) d\'un Morphisme',
        definition: `Soit $f : G \\to G'$ un morphisme de groupes :
        $$\\mathbf{\\ker(f) = \\{ x \\in G \\mid f(x) = e_{G'} \\} \\triangleleft G, \\qquad \\operatorname{Im}(f) = \\{ f(x) \\mid x \\in G \\} \\le G'}$$
        <strong>Critère d'injectivité :</strong> $f$ est injectif $\\iff \\mathbf{\\ker(f) = \\{e_G\\}}$.`,
        intuition: `Bir grup morfizmasının birebir (injectif) olduğunu kanıtlamak için $f(x)=f(y)$ ile uğraşmak yerine yalnızca çekirdeğinin birim elemandan ibaret olduğunu ($\\ker f = \\{e_G\\}$) göstermek sınavlarda en hızlı ve tam puanlık yoldur!`
    },
    'sous_groupe_normal': {
        course: 'mat204_grup',
        title: 'Sous-groupe Normal / Distingué ($N \\triangleleft G$)',
        definition: `Un sous-groupe $N \\le G$ est dit <strong>normal (ou distingué)</strong> dans $G$, noté $N \\triangleleft G$, si :
        $$\\mathbf{\\forall g \\in G, \\quad gNg^{-1} = N \\quad (\\text{c.-à-d. } \\forall g \\in G, \\forall n \\in N, \\; gng^{-1} \\in N)}$$
        <strong>Théorème (Indice 2) :</strong> Tout sous-groupe $H \\le G$ d'indice $[G : H] = 2$ est nécessairement normal dans $G$.`,
        intuition: `Sol yan kümeler ile sağ yan kümelerin çakışması ($gN = Ng$) koşuludur. Abelyen bir grupta her alt grup otomatik olarak normaldir.`
    },
    'premier_theoreme_isomorphisme': {
        course: 'mat204_grup',
        title: 'Groupe Quotient ($G/N$) & 1er Théorème d\'Isomorphisme',
        definition: `Si $N \\triangleleft G$, l'ensemble des classes $G/N = \\{ gN \\mid g \\in G \\}$ muni de $(aN)(bN) = (ab)N$ est un groupe d'ordre $|G/N| = [G:N]$.  
        <strong>Premier Théorème d'Isomorphisme :</strong> Pour tout morphisme de groupes $f : G \\to G'$ :
        $$\\mathbf{G / \\ker(f) \\;\\cong\\; \\operatorname{Im}(f)}$$`,
        intuition: `Bir morfizma verildiğinde tanım kümesini çekirdeğe böldüğünüzde doğrudan görüntü kümesine izomorf bir grup elde edersiniz ($\\mathbb{Z}/n\\mathbb{Z} \\cong \\mathbb{Z}_n$, $\\mathcal{S}_n/\\mathcal{A}_n \\cong \\{\\pm 1\\}$).`
    },
    'matrice_identite': {
        course: 'mat204_grup',
        title: 'Matrice Identité ($I_n$ - Birim Matris)',
        definition: `La <strong>matrice identité</strong> d'ordre $n$, notée $I_n$, est la matrice carrée $n \\times n$ dont les coefficients diagonaux valent $1$ et tous les autres valent $0$. Pour toute matrice $M \\in \\mathcal{M}_n(\\mathbb{R})$ :
        $$\\mathbf{M \\cdot I_n = I_n \\cdot M = M}$$`,
        intuition: `Matris çarpımının etkisiz elemanıdır. Bir kümenin matris çarpımı altında grup olduğunu kanıtlarken birim eleman ($e$) adayı daima $I_n$'dir.`
    },
    'produit_matriciel': {
        course: 'mat204_grup',
        title: 'Produit Matriciel (Matris Çarpımı & Satır × Sütun Kuralı)',
        definition: `Soient deux matrices $A = (a_{ik})$ et $B = (b_{kj})$. Le produit $C = A \\cdot B$ s'obtient par la règle <strong>\"ligne $\\times$ colonne\"</strong> :
        $$\\mathbf{c_{ij} = \\sum_{k=1}^p a_{ik} b_{kj}}$$
        Le produit matriciel est universellement <strong>associatif</strong> ($(AB)C = A(BC)$) mais en général <strong>non-commutatif</strong> ($AB \\neq BA$).`,
        intuition: `Matris çarpımının birleşmeli (associatif) olduğu $\\mathcal{M}_n(\\mathbb{R})$'de genel bir teorem olduğundan, matris alt kümelerinde birleşme aksiyomu doğrudan miras kalır.`
    },
    'groupe_heisenberg': {
        course: 'mat204_grup',
        title: 'Groupe de Heisenberg $H_3(\\mathbb{R})$ (Üst Üçgensel Matrisler Grubu)',
        definition: `L'ensemble des matrices carrées $3 \\times 3$ réelles unipotentes triangulaires supérieures :
        $$\\mathbf{H_3(\\mathbb{R}) = \\left\\{ \\begin{pmatrix} 1 & a & b \\\\ 0 & 1 & c \\\\ 0 & 0 & 1 \\end{pmatrix} \\;\\middle|\\; a, b, c \\in \\mathbb{R} \\right\\}}$$
        est un sous-groupe non-abélien de $GL_3(\\mathbb{R})$.`,
        intuition: `Asal köşegenleri 1 ve alt üçgeni 0 olan bu matrislerin çarpımı yine aynı formdadır. $a_1 c_2 \\neq a_2 c_1$ olduğunda çarpım sırası sonucu değiştirdiği için değişmeli (Abelyen) değildir.`
    },
    'critere_leibniz_series': {
        course: 'mat201_seriler',
        title: 'Critère Spécial des Séries Alternées (Leibniz Teoremi)',
        definition: `Soit $(a_n)$ une suite réelle <strong>positive, décroissante et tendant vers $0$</strong> ($\\lim a_n = 0$). Alors la série alternée $\\sum (-1)^n a_n$ converge, et le reste $R_n = \\sum_{k=n+1}^\\infty (-1)^k a_k$ est du signe de son premier terme et vérifie :
        $$\\mathbf{|R_n| \\le a_{n+1}}$$`,
        intuition: `Alterne serilerde yakınsaklık için 3 şartın üçü de ($a_n \\ge 0$, $a_{n+1} \\le a_n$, $\\lim a_n = 0$) tek tek doğrulanmalıdır. Kalan terim tahmini $|R_n| \\le a_{n+1}$ sınavlarda yaklaşık toplam hesabı için kullanılır.`
    },
    'convergence_uniforme_sup': {
        course: 'mat201_seriler',
        title: 'Convergence Uniforme & Norme Supremum ($\\|f_n - f\\|_\\infty$)',
        definition: `Une suite de fonctions $(f_n)$ converge uniformément vers $f$ sur un domaine $D$ si et seulement si :
        $$\\mathbf{\\lim_{n \\to +\\infty} \\|f_n - f\\|_{\\infty, D} = \\lim_{n \\to +\\infty} \\left( \\sup_{x \\in D} |f_n(x) - f(x)| \\right) = 0}$$`,
        intuition: `Noktasal yakınsaklıkta önce $x$ sabitlenir sonra limit alınır; düzgün yakınsaklıkta ise tüm kümedeki maksimum fark ($M_n = \\sup |f_n(x)-f(x)|$) türev tablosuyla bulunur ve $M_n \\to 0$ olup olmadığına bakılır.`
    },
    'formule_poisson_frenet': {
        course: 'fiz101_fizik',
        title: 'Formule de Poisson & Base de Frenet ($\\vec{T}, \\vec{N}$)',
        definition: `<strong>Formule de Poisson :</strong> Pour tout vecteur $\\vec{A}(t)$ dans un repère mobile $R'$ en rotation $\\vec{\\Omega}$ par rapport à $R_0$ :
        $$\\mathbf{\\left(\\frac{d\\vec{A}}{dt}\\right)_{R_0} = \\left(\\frac{d\\vec{A}}{dt}\\right)_{R'} + \\vec{\\Omega} \\times \\vec{A}}$$
        <strong>Base de Frenet :</strong> $\\mathbf{\\vec{v} = v\\vec{T}}, \\quad \\mathbf{\\vec{a} = \\frac{dv}{dt}\\vec{T} + \\frac{v^2}{\\rho}\\vec{N}}$.`,
        intuition: `Birim vektörlerin boyu sabit ($1$) olduğu için türevleri kendilerine daima diktir! Kutupsal bazda $\\dot{\\vec{u}}_r = \\dot{\\theta}\\vec{u}_\\theta$ ve $\\dot{\\vec{u}}_\\theta = -\\dot{\\theta}\\vec{u}_r$ bağıntıları tüm kinematik denklemlerin temelidir.`
    },
    'theoreme_bayes_totales': {
        course: 'mat206_olasilik',
        title: 'Formule des Probabilités Totales & Théorème de Bayes',
        definition: `Pour un système complet d'événements $(B_1, \\dots, B_n)$ de $\\Omega$ et tout événement $A$ ($P(A) > 0$) :
        $$\\mathbf{P(A) = \\sum_{i=1}^n P(A \\mid B_i)P(B_i), \\qquad P(B_k \\mid A) = \\frac{P(A \\mid B_k)P(B_k)}{\\sum_{i=1}^n P(A \\mid B_i)P(B_i)}}$$`,
        intuition: `Sebepten sonuca giderken Toplam Olasılık Formülü, sonuç gözlemlendiğinde hangi sebepten geldiğini (a posteriori olasılık) bulurken Bayes Teoremi kullanılır.`
    }
};

function termLink(key, label) {
    return `<span class="term-link" onclick="openConceptModal('${key}')" title="Teoremi / Tanımı İncele">${label}</span>`;
}
