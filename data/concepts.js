// ================= INLINE CONCEPT / THEOREM REMINDERS DATABASE =================
// Used by openConceptModal(key), Spotlight Search, and Automatic Inline Concept Linker (.term-link & .concept-pill)

const conceptsDB = {
    // =========================================================================
    // 1. MAT204 — GRUP TEORİSİ (THÉORIE DES GROUPES)
    // =========================================================================
    'division_euclidienne_congruence': {
        title: "Division Euclidienne, Divisibilité & Congruences (Bölünebilirlik ve Modüler Aritmetik)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "• **Division euclidienne :** Pour tous $a \\in \\mathbb{Z}$ et $b \\in \\mathbb{N}^*$, il existe un unique couple $(q, r) \\in \\mathbb{Z}^2$ tel que $a = bq + r$ avec $0 \\le r < b$.\n• **Combinaison linéaire :** Si $d \\mid a$ et $d \\mid b$, alors $\\forall u, v \\in \\mathbb{Z},\\; d \\mid (au + bv)$.\n• **Congruence :** $a \\equiv b \\pmod n \\iff n \\mid (a - b)$. Compatible avec l'addition, la multiplication et les puissances $a^k \\equiv b^k \\pmod n$.",
        intuition: "TD-1'deki bölünebilirlik sorularında (örneğin $5 \\mid n^2+2$ ve $5 \\mid n+1$) bilinmeyen $n$'yi yok etmek için ifadeleri birbirinin katlarıyla toplayıp çıkar (**doğrusal kombinasyon**). Parite (tek/çift) sorularında ise tam sayıları $n = 2m$ ve $n = 2m+1$ diye iki duruma ayır.",
        redaction: "Par compatibilité des congruences avec l'addition et la multiplication modulo $n$, et par propriété de combinaison linéaire des diviseurs :"
    },
    'axiomes_groupe': {
        title: "Axiomes d'un Groupe & Régularité (Grup Aksiyomları ve Sadeleştirme Kuralları)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Un ensemble non vide $G$ muni d'une loi interne $\\star$ est un **groupe** si :\n1. **Associativité :** $\\forall x, y, z \\in G,\\; (x \\star y) \\star z = x \\star (y \\star z)$\n2. **Élément neutre :** $\\exists e \\in G,\\; \\forall x \\in G,\\; x \\star e = e \\star x = x$ (unique)\n3. **Inverse (symétrique) :** $\\forall x \\in G,\\; \\exists x^{-1} \\in G,\\; x \\star x^{-1} = x^{-1} \\star x = e$ (unique)\n**Propriétés :** Tout élément est régulier ($xy = xz \\implies y = z$), et $(xy)^{-1} = y^{-1}x^{-1}$ (règle chaussettes-chaussures).",
        intuition: "Yeni tanımlanan bir işlemin (örneğin $x \\star y = x + y - xy$) grup olduğunu gösterirken **en kritik adım kümenin kapalılığıdır (loi de composition interne)**! Yani dışlanan noktanın (örn: $x=1$) işlem sonucunda asla üretilemeyeceğini ($x \\star y = 1 \\implies x=1 \\text{ veya } y=1$) mutlaka kanıtla.",
        redaction: "Vérifions dans l'ordre que $\\star$ est bien une loi de composition interne sur $G$, qu'elle est associative, admet un élément neutre $e$, et que tout élément possède un symétrique dans $G$."
    },
    'identite_bezout': {
        title: "Théorème de Bézout (Bézout Özdeşliği)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Soient $a, b \\in \\mathbb{Z}$ deux entiers non tous deux nuls, et $d = \\text{pgcd}(a, b)$. Il existe $u, v \\in \\mathbb{Z}$ tels que $au + bv = d$. En particulier, **$\\text{pgcd}(a, b) = 1 \\iff \\exists u, v \\in \\mathbb{Z},\\; au + bv = 1$**.",
        intuition: "İki sayının aralarında asal ($\\text{pgcd}(a,b)=1$) olduğunu kanıtlamanın **en güçlü silahıdır**. Eğer soruda sana bir eşitlik verilmişse, o eşitliği zorla $(a \\times \\text{bir şey}) + (b \\times \\text{başka bir şey}) = 1$ formatına sok! Ayrıca $\\mathbb{Z}/n\\mathbb{Z}$ içinde $a$'nın çarpımsal tersini bulmak için $au + nv = 1 \\implies \\bar{a}^{-1} = \\bar{u}$ kullanılır.",
        redaction: "Par le théorème de Bézout, puisque $\\text{pgcd}(a, n) = 1$, il existe $u, v \\in \\mathbb{Z}$ tels que $au + nv = 1$, d'où $\\bar{a}\\bar{u} = \\bar{1}$ dans $\\mathbb{Z}/n\\mathbb{Z}$."
    },
    'algorithme_euclide': {
        title: "Algorithme d'Euclide Étendu (Genişletilmiş Öklid Algoritması)",
        course: "mat204_grup",
        badge: "Yöntem • MAT204",
        definition: "Pour calculer $d = \\text{pgcd}(a, b)$ et trouver les coefficients de Bézout $(u, v)$ tels que $au + bv = d$, on effectue les divisions euclidiennes successives $r_{k-1} = r_k q_k + r_{k+1}$ jusqu'au dernier reste non nul, puis on **remonte** les égalités.",
        intuition: "Sınavda $\\mathbb{Z}_{34}$ veya $U(20)$ içinde bir elemanın tersini ($x^{-1}$) sorarlarsa göz kararı deneme yapma! Ardışık bölme yapıp kalan $1$'i bulduktan sonra yukarı doğru yerine koyarak $au + nv = 1$ katsayılarını 30 saniyede hatasız bul.",
        redaction: "En remontant l'algorithme d'Euclide, on obtient la relation de Bézout $au + nv = 1$, donc l'inverse de $\\bar{a}$ modulo $n$ est $\\bar{u}$."
    },
    'theoreme_gauss': {
        title: "Lemme de Gauss (Gauss Lemması)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Soient $a, b, c \\in \\mathbb{Z}^*$. Si $a$ divise le produit $bc$ ($a \\mid bc$) et si $a$ est premier avec $b$ ($\\text{pgcd}(a, b) = 1$), alors **$a$ divise $c$ ($a \\mid c$)**.",
        intuition: "Bölünebilirlik ve mertebe ($o(x)$) sorularında kilit kırıcıdır! Örneğin $a$ sayısı $b \\times c$ çarpımını bölüyor ama $a$ ile $b$'nin hiçbir ortak böleni yoksa ($\\text{pgcd}(a,b)=1$), $a$'nın tüm çarpanları mecbur $c$'nin içindedir.",
        redaction: "D'après le lemme de Gauss, comme $a \\mid bc$ et $\\text{pgcd}(a, b) = 1$, on en déduit que $a \\mid c$."
    },
    'element_inversible': {
        title: "Groupe des Unités U(n) (Tersinir Elemanlar Grubu)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Un élément $\\bar{k} \\in \\mathbb{Z}/n\\mathbb{Z}$ est inversible pour la multiplication modulo $n$ si et seulement si $\\text{pgcd}(k, n) = 1$. L'ensemble des inversibles forme un groupe multiplicatif abélien d'ordre $|U(n)| = \\varphi(n)$ : $$U(n) = (\\mathbb{Z}/n\\mathbb{Z})^\\times = \\{\\bar{k} \\in \\mathbb{Z}/n\\mathbb{Z} \\mid \\text{pgcd}(k, n) = 1\\}$$",
        intuition: "Toplamsal grup $(\\mathbb{Z}_n, +)$ içinde her elemanın tersi vardır ($-k$), ama çarpımsal grup $U(n)$ içine **sadece $n$ ile aralarında asal olanlar** girebilir! Örneğin $U(10) = \\{\\bar{1}, \\bar{3}, \\bar{7}, \\bar{9}\\}$.",
        redaction: "On sait que $\\bar{k} \\in (\\mathbb{Z}/n\\mathbb{Z})^\\times \\iff \\text{pgcd}(k, n) = 1$. Ainsi $|U(n)| = \\varphi(n)$."
    },
    'indicatrice_euler': {
        title: "Indicatrice d'Euler φ(n) (Euler Totient Fonksiyonu)",
        course: "mat204_grup",
        badge: "Formül • MAT204",
        definition: "Pour $n = p_1^{\\alpha_1} \\cdots p_k^{\\alpha_k}$, le nombre d'entiers de $\\{1, \\dots, n\\}$ premiers avec $n$ est donné par : $$\\varphi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right) = \\prod_{i=1}^k p_i^{\\alpha_i - 1}(p_i - 1)$$ Si $\\text{pgcd}(m, n) = 1$, alors $\\varphi(mn) = \\varphi(m)\\varphi(n)$.",
        intuition: "3 kritik kullanım yeri vardır: **1)** Çarpımsal grup $U(n)$'nin eleman sayısı $\\varphi(n)$'dir. **2)** $n$ mertebeli devirli (cyclique) bir grupta tam olarak $\\varphi(n)$ tane üreteç (générateur) vardır. **3)** $d \\mid n$ ise $\\mathbb{Z}_n$ içinde $d$ mertebeli eleman sayısı $\\varphi(d)$'dir.",
        redaction: "Par multiplicativité de l'indicatrice d'Euler, $\\varphi(n) = \\prod p_i^{\\alpha_i - 1}(p_i - 1)$."
    },
    'theoreme_fermat': {
        title: "Théorème d'Euler & Petit Théorème de Fermat",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Pour tout entier $a$ premier avec $n$ ($\\text{pgcd}(a, n) = 1$), on a : $$a^{\\varphi(n)} \\equiv 1 \\pmod{n}$$ En particulier, si $p$ est premier et $p \\nmid a$, alors **$a^{p-1} \\equiv 1 \\pmod{p}$**.",
        intuition: "Aslında bu teorem $U(n)$ grubunda Lagrange Teoremi'nin doğrudan sonucudur! Sınavda $7^{2026} \\pmod{15}$ gibi devasa üsler sorulduğunda hemen $\\varphi(15) = 8$ hesapla ve üssü $8$'e bölerek kalanı al.",
        redaction: "Comme $\\text{pgcd}(a, n) = 1$, on a $\\bar{a} \\in U(n)$ d'ordre $\\varphi(n)$. Par le théorème d'Euler (Lagrange dans $U(n)$), $a^{\\varphi(n)} \\equiv 1 \\pmod{n}$."
    },
    'relation_equivalence': {
        title: "Relation d'Équivalence & Classes (Denklik İlişkisi ve Sınıfları)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Une relation binaire $\\mathcal{R}$ sur $E$ est une **relation d'équivalence** si elle est :\n1. **Réflexive :** $\\forall x \\in E,\\; x\\mathcal{R}x$\n2. **Symétrique :** $\\forall x, y \\in E,\\; x\\mathcal{R}y \\implies y\\mathcal{R}x$\n3. **Transitive :** $\\forall x, y, z \\in E,\\; (x\\mathcal{R}y \\text{ et } y\\mathcal{R}z) \\implies x\\mathcal{R}z$\nLes classes d'équivalence $\\text{cl}(x) = \\{y \\in E \\mid y\\mathcal{R}x\\}$ forment une **partition** de $E$.",
        intuition: "TD-1 ve Bölüm Grubu ($G/H$) sorularının temelidir. Sol yan kümeler $xH = yH \\iff x^{-1}y \\in H$ tam olarak bir denklik bağıntısıdır: yansıma $e \\in H$'den, simetri $(x^{-1}y)^{-1} \\in H$'den, geçişme ise çarpma kapalılığından gelir!",
        redaction: "Montrons que $\\mathcal{R}$ est réflexive, symétrique et transitive sur $G$."
    },
    'critere_sous_groupe': {
        title: "Caractérisation des Sous-groupes (Alt Grup Testi / Kriteri)",
        course: "mat204_grup",
        badge: "Kriter • MAT204",
        definition: "Soit $(G, \\cdot)$ un groupe et $H \\subset G$. $H$ est un **sous-groupe** de $G$ ($H \\le G$) si et seulement si :\n1. **$H \\neq \\emptyset$** (en montrant toujours que $e_G \\in H$)\n2. **$\\forall x, y \\in H,\\; x \\cdot y^{-1} \\in H$** (ou stabilité par produit $xy \\in H$ et passage à l'inverse $x^{-1} \\in H$).",
        intuition: "Sınavda 'Montrer que $H$ est un sous-groupe' gördüğün an 1. satırda **mutlaka $e_G \\in H$** olduğunu yaz (bunu unutmak direkt puan kaybettirir!). Sonra $x, y \\in H$ alıp $xy^{-1} \\in H$ (toplamsal grupta $x - y \\in H$) olduğunu göster.",
        redaction: "Montrons que $H$ est un sous-groupe de $G$ :\n1) $e_G \\in H$ donc $H \\neq \\emptyset$.\n2) Soient $x, y \\in H$. Montrons que $xy^{-1} \\in H$."
    },
    'groupe_abelien': {
        title: "Groupe Abélien / Commutatif (Abelyen / Değişmeli Grup)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Un groupe $(G, \\cdot)$ est dit **abélien** (ou commutatif) si : $$\\forall x, y \\in G, \\quad x \\cdot y = y \\cdot x$$ Dans un groupe non-abélien, $(xy)^n \\neq x^n y^n$ en général, et $(xy)^{-1} = y^{-1}x^{-1}$ (inversion de l'ordre).",
        intuition: "Matris grupları ($GL_n$), permütasyon grupları ($S_n, n\\ge 3$) ve dihedral gruplar ($D_n, n\\ge 3$) **abelyen değildir**! Eğer soruda $(xy)^2 = x^2y^2$ veya $x^2 = e$ verildiyse, soldan $x^{-1}$ ve sağdan $y^{-1}$ ile sadeleştirme yaparak $xy = yx$ elde edilir.",
        redaction: "Soient $x, y \\in G$. Montrons que $xy = yx$, c'est-à-dire que $G$ est abélien."
    },
    'groupe_klein_v4': {
        title: "Groupe de Klein V₄ (Klein 4-Grubu)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Tout groupe $G$ d'ordre $4$ est isomorphe soit au groupe cyclique $\\mathbb{Z}/4\\mathbb{Z}$, soit au **groupe de Klein** $V_4 \\simeq \\mathbb{Z}/2\\mathbb{Z} \\times \\mathbb{Z}/2\\mathbb{Z} = \\{e, a, b, c\\}$ où chaque élément distinct du neutre est d'ordre $2$ ($a^2=b^2=c^2=e$, $ab=c$).",
        intuition: "4 elemanlı **devirli olmayan (non-cyclique)** tek gruptur! Eğer bir grupta birim dışındaki tüm elemanların karesi $e$ ise ($x^2 = e \\implies x = x^{-1}$), grup kesinlikle abelyendir ve 4 elemanlıysa Klein grubu $V_4$'e izomorftur (örn: $U(8)$ ve $U(12)$).",
        redaction: "Comme $|G| = 4$ et que tout élément $x \\neq e$ est d'ordre $2$, $G$ n'est pas cyclique : il est isomorphe au groupe de Klein $V_4 \\simeq \\mathbb{Z}/2\\mathbb{Z} \\times \\mathbb{Z}/2\\mathbb{Z}$."
    },
    'relation_diedrale': {
        title: "Groupe Diédral Dₙ (Dihedral Grup ve Temel Bağıntı)",
        course: "mat204_grup",
        badge: "Formül • MAT204",
        definition: "Le groupe diédral $D_n$ des isométries du $n$-gone régulier est d'ordre **$2n$**, engendré par une rotation $r$ d'angle $2\\pi/n$ et une symétrie $s$ vérifiant : $$r^n = e, \\quad s^2 = e, \\quad s r s^{-1} = s r s = r^{-1} \\iff s r^k = r^{-k} s$$",
        intuition: "$D_n$ sorularında tüm sadeleştirmeler tek bir kurala dayanır: **$s$ ile $r$ yer değiştirirken $r$'nin üssü işaret değiştirir ($sr^k = r^{n-k}s$)**! $D_n$ içinde $n$ tane dönme ($r^k$, mertebeleri $n/\\text{pgcd}(k,n)$) ve $n$ tane yansıma ($r^ks$, hepsinin mertebesi **2**'dir!) bulunur.",
        redaction: "Dans $D_n = \\langle r, s \\mid r^n = e, s^2 = e, srs = r^{-1} \\rangle$, on utilise la relation de commutation $sr^k = r^{-k}s$."
    },
    'centre_groupe': {
        title: "Centre d'un Groupe Z(G) (Grubun Merkezi)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Le **centre** de $G$ est l'ensemble des éléments qui commutent avec **tous** les éléments de $G$ : $$Z(G) = \\{z \\in G \\mid \\forall g \\in G,\\; zg = gz\\}$$ $Z(G)$ est toujours un **sous-groupe distingué (normal) abélien** de $G$. De plus, $G$ est abélien $\\iff Z(G) = G$.",
        intuition: "Merkez $Z(G)$, grubun 'herkesle anlaşabilen VIP kulübüdür'. Sınavda $Z(D_n)$ veya matris grubu merkezi sorulursa, seçtiğin $z$ elemanını grubun üreteçleriyle (örneğin $D_n$'de hem $r$ hem $s$ ile) değişmeli olmaya zorla!",
        redaction: "Par définition, $z \\in Z(G) \\iff \\forall g \\in G,\\; zg = gz \\iff \\forall g \\in G,\\; gzg^{-1} = z$."
    },
    'centralisateur_element': {
        title: "Centralisateur C_G(a) (Bir Elemanın Merkezleyeni)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Pour un élément fixé $a \\in G$, le **centralisateur** de $a$ dans $G$ est le sous-groupe des éléments qui commutent avec $a$ : $$C_G(a) = \\{g \\in G \\mid ga = ag\\} \\le G$$ On a toujours $\\langle a \\rangle \\subset C_G(a)$ et $Z(G) = \\bigcap_{a \\in G} C_G(a)$.",
        intuition: "$Z(G)$ ile karıştırma! $Z(G)$'ye girmek için gruptaki **herkesle** değişmeli olman gerekirken, $C_G(a)$'ya girmek için **sadece $a$ elemanı ile** değişmeli olman yeterlidir.",
        redaction: "Soient $x, y \\in C_G(a)$. Alors $(xy^{-1})a = x(y^{-1}a) = x(ay^{-1}) = (xa)y^{-1} = a(xy^{-1})$, donc $C_G(a) \\le G$."
    },
    'ordre_element': {
        title: "Ordre d'un Élément o(x) (Elemanın Mertebesi)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "L'**ordre** d'un élément $x \\in G$, noté $o(x) = |\\langle x \\rangle|$, est le plus petit entier $k \\ge 1$ tel que $x^k = e$. Propriété fondamentale : $$x^m = e \\iff o(x) \\text{ divise } m$$ De plus, dans un groupe fini, **$o(x)$ divise toujours $|G|$** et $o(x^{-1}) = o(x) = o(gxg^{-1})$.",
        intuition: "Sınavların **en kritik özelliğidir**: Eğer bir soruda $x^m = e$ bulduysan bu $o(x) = m$ demek **DEĞİLDİR**; $o(x) \\mid m$ demektir! Örneğin $x^6 = e$ ise $o(x) \\in \\{1, 2, 3, 6\\}$ olabilir; tam olarak $6$ olduğunu kanıtlamak için $x^2 \\neq e$ ve $x^3 \\neq e$ olduğunu göstermelisin.",
        redaction: "Par propriété caractéristique de l'ordre d'un élément, $x^m = e \\iff o(x) \\mid m$."
    },
    'ordre_puissance': {
        title: "Formule de l'Ordre d'une Puissance o(xᵏ) (Kuvvetin Mertebesi Formülü)",
        course: "mat204_grup",
        badge: "Formül • MAT204",
        definition: "Soit $x \\in G$ un élément d'ordre fini $n = o(x)$. Pour tout $k \\in \\mathbb{Z}$, l'ordre de $x^k$ est : $$o(x^k) = \\frac{n}{\\text{pgcd}(n, k)}$$ En notation additive dans $\\mathbb{Z}/n\\mathbb{Z}$ : $o(\\bar{k}) = \\frac{n}{\\text{pgcd}(n, k)}$. En particulier, $x^k$ engendre $\\langle x \\rangle \\iff \\text{pgcd}(n, k) = 1$.",
        intuition: "İspatı sınavda sıkça sorulur! Mantığı: $d = \\text{pgcd}(n,k)$ koyup $n = dn'$, $k = dk'$ yazarsın ($\\text{pgcd}(n',k')=1$). $(x^k)^m = e \\iff n \\mid km \\iff n' \\mid k'm \\implies n' \\mid m$ (Gauss Lemması ile!).",
        redaction: "Comme $o(x) = n$, l'ordre de $x^k$ est donné par la formule $o(x^k) = \\frac{n}{\\text{pgcd}(n, k)}$."
    },
    'groupe_cyclique': {
        title: "Groupe Cyclique & Sous-groupes (Devirli Gruplar ve Alt Grupları)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Un groupe $G$ est **cyclique** s'il existe $a \\in G$ tel que $G = \\langle a \\rangle$. Tout groupe cyclique d'ordre $n$ est isomorphe à $(\\mathbb{Z}/n\\mathbb{Z}, +)$.\n• Tout sous-groupe d'un groupe cyclique est **cyclique**.\n• Pour chaque diviseur $d \\mid n$, il existe un **unique** sous-groupe d'ordre $d$, engendré par $a^{n/d}$, et $\\varphi(d)$ éléments d'ordre $d$.",
        intuition: "Bir grubun devirli olduğunu kanıtlamak için mertebesi grup mertebesine eşit olan **tek bir eleman** ($o(x) = |G|$) bulman yeterlidir! Devirli olmadığını kanıtlamak içinse gruptaki hiçbir elemanın mertebesinin $|G|$ olmadığını göster.",
        redaction: "Comme $G$ est fini d'ordre $n$ et contient un élément $a$ d'ordre $n$, on a $|\\langle a \\rangle| = |G|$, d'où $G = \\langle a \\rangle$ est cyclique."
    },
    'racines_unite': {
        title: "Groupe des Racines n-ièmes de l'Unité μₙ (Birim Kökler Grubu)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "L'ensemble des racines $n$-ièmes de l'unité dans $\\mathbb{C}^*$ est un groupe cyclique d'ordre $n$ : $$\\mu_n = \\{z \\in \\mathbb{C}^* \\mid z^n = 1\\} = \\left\\{e^{2i\\pi k/n} \\;\\middle|\\; 0 \\le k \\le n-1\\right\\} \\simeq \\mathbb{Z}/n\\mathbb{Z}$$ Les générateurs de $\\mu_n$ (racines **primitives**) sont les $\\omega^k = e^{2i\\pi k/n}$ avec $\\text{pgcd}(k, n) = 1$ (il y en a $\\varphi(n)$).",
        intuition: "Karmaşık sayılarda çarpma işlemi, üsteki açıları toplamaya dönüştüğü için $(\\mu_n, \\times)$ grubu doğrudan $(\\mathbb{Z}/n\\mathbb{Z}, +)$ grubunun kopyasıdır! İlkel kök (racine primitive) = grubun üreteci demektir.",
        redaction: "Le groupe $(\\mu_n, \\times)$ est cyclique d'ordre $n$, engendré par $\\omega = e^{2i\\pi/n}$, et ses générateurs sont les $\\omega^k$ avec $\\text{pgcd}(k, n) = 1$."
    },
    'theoreme_lagrange': {
        title: "Théorème de Lagrange (Lagrange Teoremi ve Sonuçları)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Soit $G$ un groupe fini et $H$ un sous-groupe de $G$ ($H \\le G$). Alors l'ordre de $H$ divise l'ordre de $G$ : $$|G| = [G : H] \\cdot |H|$$\n**Corollaires immédiats :**\n1. Pour tout $x \\in G$, $o(x) \\mid |G|$ et $x^{|G|} = e$.\n2. Tout groupe d'ordre premier $p$ est **cyclique** ($G \\simeq \\mathbb{Z}/p\\mathbb{Z}$) et n'a que $\\{e\\}$ et $G$ comme sous-groupes.",
        intuition: "Grup Teorisinin **Anayasasıdır**! İspatı sol yan kümelerin ($gH$) grubu ayrık ve eşit boyutta ($|gH| = |H|$) parçalara ayırmasına dayanır. ⚠️ **Sınav Tuzağı:** Lagrange'ın tersi genel gruplarda **YANLIŞTIR** ($d \\mid |G|$ olması $d$ elemanlı alt grup var demektir anlamına gelmez, örn: $A_4$'ün 6 elemanlı alt grubu yoktur!).",
        redaction: "D'après le théorème de Lagrange, puisque $H$ est un sous-groupe du groupe fini $G$, $|H|$ divise $|G|$ et $[G:H] = |G|/|H|$."
    },
    'cycles_disjoints': {
        title: "Décomposition en Cycles Disjoints dans Sₙ (Ayrık Döngülere Ayırma)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Toute permutation $\\sigma \\in S_n$ se décompose de manière unique (à l'ordre des facteurs près) en produit de **cycles à supports disjoints** $\\sigma = c_1 c_2 \\cdots c_r$.\n• Deux cycles à supports disjoints **commutent** : $c_i c_j = c_j c_i$.\n• L'**ordre** de $\\sigma$ est le PPCM des longueurs des cycles disjoints : $$o(\\sigma) = \\text{ppcm}(\\ell(c_1), \\dots, \\ell(c_r))$$",
        intuition: "Bir permütasyonun mertebesini veya $\\sigma^{2026}$ gibi büyük bir kuvvetini bulmadan önce **kesinlikle önce ayrık döngülere (cycles disjoints) ayırmalısın**! Ayrık olmayan döngülerin EKOK'unu almak sınavdaki en ölümcül hatadır.",
        redaction: "Décomposons $\\sigma$ en produit de cycles à supports disjoints : $\\sigma = c_1 \\cdots c_r$. Comme ces cycles commutent, $o(\\sigma) = \\text{ppcm}(\\ell(c_1), \\dots, \\ell(c_r))$."
    },
    'signature_permutation': {
        title: "Signature d'une Permutation ε(σ) & Groupe Alterné Aₙ (İmza ve Alterne Grup)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "La **signature** $\\varepsilon : S_n \\to \\{\\pm 1\\}$ est un morphisme de groupes surjectif ($n \\ge 2$).\n• Un **$k$-cycle** a pour signature $\\varepsilon(c) = (-1)^{k-1}$ (attention : un 3-cycle est **pair** !).\n• Si $\\sigma$ est produit de $r$ cycles disjoints sur $\\{1,\\dots,n\\}$ (points fixes inclus), $\\varepsilon(\\sigma) = (-1)^{n-r}$.\n• Le noyau $\\ker(\\varepsilon) = A_n$ est le **groupe alterné** des permutations paires, sous-groupe distingué d'ordre $n!/2$.",
        intuition: "⚠️ **En Büyük Sınav Tuzağı:** $k$ uzunluğundaki bir döngünün imzası $(-1)^k$ **DEĞİL**, $(-1)^{k-1}$'dir! Çünkü $k$-döngü $(k-1)$ tane transpozisyonun çarpımıdır. Yani **tek uzunluklu döngüler ÇİFT ($\varepsilon=+1$)**, çift uzunluklu döngüler TEK ($\varepsilon=-1$) permütasyondur!",
        redaction: "Un cycle de longueur $k$ se décompose en $k-1$ transpositions, donc sa signature vaut $\\varepsilon(c) = (-1)^{k-1}$."
    },
    'morphisme_groupes': {
        title: "Morphisme de Groupes (Grup Morfizması / Homomorfizma)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "Soient $(G, \\star)$ et $(G', \\cdot)$ deux groupes. Une application $f : G \\to G'$ est un **morphisme de groupes** si : $$\\forall x, y \\in G, \\quad f(x \\star y) = f(x) \\cdot f(y)$$ Propriétés : $f(e_G) = e_{G'}$, $f(x^{-1}) = [f(x)]^{-1}$, et $o(f(x)) \\mid o(x)$ (avec égalité si $f$ est injectif).",
        intuition: "İşlemi koruyan köprüdür: 'Önce $G$'de çarpıp sonra $f$ uygula' ile 'Önce $f$ uygulayıp sonra $G'$'de çarp' aynı sonucu verir. Örneğin $\\det : GL_n(\\mathbb{R}) \\to \\mathbb{R}^*$, $\\exp : (\\mathbb{R},+) \\to (\\mathbb{R}_+^*,\\times)$ ve $\\varepsilon : S_n \\to \\{\\pm 1\\}$ en klasik grup morfizmalarıdır.",
        redaction: "Soient $x, y \\in G$. On vérifie que $f(xy) = f(x)f(y)$, donc $f$ est bien un morphisme de groupes."
    },
    'noyau_image': {
        title: "Noyau ker(f) & Image Im(f) d'un Morphisme (Çekirdek ve Görüntü)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Pour un morphisme de groupes $f : G \\to G'$ :\n• **Noyau :** $\\ker(f) = \\{x \\in G \\mid f(x) = e_{G'}\\}$ est un **sous-groupe distingué** de $G$ ($\\ker(f) \\triangleleft G$).\n• **Image :** $\\text{Im}(f) = f(G) = \\{f(x) \\mid x \\in G\\}$ est un sous-groupe de $G'$.\n• **Critère d'injectivité :** **$f$ est injectif $\\iff \\ker(f) = \\{e_G\\}$**.",
        intuition: "Bir grup morfizmasının birebir (injectif) olduğunu kanıtlarken **asla** $f(x)=f(y)$ ile uğraşma! Sadece $x \\in \\ker(f) \\iff f(x) = e_{G'}$ al ve buradan $x = e_G$ çıktığını göster. Hem yarı yarıya daha kısadır hem de tam puan verir!",
        redaction: "Comme $f$ est un morphisme de groupes, $f$ est injectif si et seulement si $\\ker(f) = \\{e_G\\}$."
    },
    'sous_groupe_normal': {
        title: "Sous-groupe Distingué / Normal H ◁ G (Normal Alt Grup)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Un sous-groupe $H \\le G$ est **distingué (ou normal)** dans $G$, noté $H \\triangleleft G$, si l'une des conditions équivalentes suivantes est vérifiée :\n1. $\\forall g \\in G,\\; gH = Hg$\n2. **$\\forall g \\in G,\\; \\forall h \\in H,\\; ghg^{-1} \\in H$** (stabilité par conjugaison)\n3. $H$ est le noyau d'un morphisme de groupes.\n**Critères automatiques :** Tout sous-groupe d'un groupe abélien est normal ; tout sous-groupe d'indice $[G:H] = 2$ est normal.",
        intuition: "Bölüm grubu $G/H$'yi kurabilmenin **tek şartı** $H \\triangleleft G$ olmasıdır! Sınavda bir alt grubun normal olduğunu göstermenin en şık 3 yolu: **1)** $ghg^{-1} \\in H$ göstermek, **2)** $H = \\ker(f)$ olacak bir morfizma bulmak (örn: $SL_n = \\ker(\\det)$, $A_n = \\ker(\\varepsilon)$), **3)** İndeksin $[G:H] = 2$ olduğunu söylemek!",
        redaction: "Montrons que $H$ est distingué dans $G$ : soient $g \\in G$ et $h \\in H$, vérifions que $ghg^{-1} \\in H$."
    },
    'premier_theoreme_isomorphisme': {
        title: "Premier Théorème d'Isomorphisme (Birinci İzomorfizma Teoremi)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Soit $f : G \\to G'$ un morphisme de groupes. Alors $\\ker(f) \\triangleleft G$, $\\text{Im}(f) \\le G'$, et l'application induite $\\bar{f}(\\bar{x}) = f(x)$ est un **isomorphisme de groupes** : $$G / \\ker(f) \\simeq \\text{Im}(f)$$ En particulier, si $G$ est fini : $|G| = |\\ker(f)| \\cdot |\\text{Im}(f)|$.",
        intuition: "Bölüm gruplarını tanımanın **sihirli değneğidir**! Örneğin '$GL_n(\\mathbb{R}) / SL_n(\\mathbb{R})$ neye izomorftur?' sorusunda $\\det : GL_n(\\mathbb{R}) \\to \\mathbb{R}^*$ morfizmasını yazarsın: $\\ker(\\det) = SL_n(\\mathbb{R})$ ve $\\text{Im}(\\det) = \\mathbb{R}^*$ olduğundan tek satırda $GL_n(\\mathbb{R})/SL_n(\\mathbb{R}) \\simeq \\mathbb{R}^*$ çıkar!",
        redaction: "D'après le premier théorème d'isomorphisme appliqué au morphisme surjectif $f : G \\to G'$, on obtient $G/\\ker(f) \\simeq \\text{Im}(f) = G'$."
    },
    'matrice_identite': {
        title: "Groupe Linéaire GLₙ(K) & Spécial Linéaire SLₙ(K)",
        course: "mat204_grup",
        badge: "Tanım • MAT204",
        definition: "• $GL_n(\\mathbb{K}) = \\{A \\in M_n(\\mathbb{K}) \\mid \\det(A) \\neq 0\\}$ est le groupe linéaire des matrices inversibles (neutre $I_n$).\n• $SL_n(\\mathbb{K}) = \\{A \\in GL_n(\\mathbb{K}) \\mid \\det(A) = 1\\} = \\ker(\\det)$ est un sous-groupe distingué de $GL_n(\\mathbb{K})$.",
        intuition: "Matris çarpımı birleşmelidir ($A(BC)=(AB)C$) ama $n \\ge 2$ için **değişmeli değildir** ($AB \\neq BA$)! Determinant fonksiyonu $\\det(AB) = \\det(A)\\det(B)$ özelliğinden dolayı $GL_n$'den $\\mathbb{K}^*$'a giden bir grup morfizmasıdır.",
        redaction: "Comme $\\det : GL_n(\\mathbb{R}) \\to \\mathbb{R}^*$ est un morphisme de groupes de noyau $SL_n(\\mathbb{R})$, on a $SL_n(\\mathbb{R}) \\triangleleft GL_n(\\mathbb{R})$."
    },
    'produit_matriciel': {
        title: "Puissances de Matrices & Nilpotence (Matris Kuvvetleri)",
        course: "mat204_grup",
        badge: "Yöntem • MAT204",
        definition: "Pour calculer $A^k$ lorsque $A = I_n + N$ avec $I_n N = N I_n$ et $N$ nilpotente ($N^p = 0$), on utilise la formule du binôme de Newton : $$(I_n + N)^k = I_n + kN + \\frac{k(k-1)}{2}N^2 + \\cdots$$",
        intuition: "Üst üçgensel matrislerde köşegen 1'lerden oluşuyorsa ($A = I + N$), matrisin kuvvetini alırken sağ üstteki elemanlar doğrusal/polinomik olarak büyür. Bu yüzden sonlu cisim ($\\mathbb{Z}/p\\mathbb{Z}$) üzerinde değilsek sıfırdan farklı $N$ için mertebe sonsuzdur!",
        redaction: "On écrit $A = I + N$ avec $N^2 = 0$ (ou $N^3 = 0$). Comme $I$ et $N$ commutent, la formule du binôme donne $A^k$."
    },
    'groupe_heisenberg': {
        title: "Groupe de Heisenberg H(K) (Heisenberg Matris Grubu)",
        course: "mat204_grup",
        badge: "Teorem • MAT204",
        definition: "Le groupe de Heisenberg est constitué des matrices triangulaires supérieures unipotentes : $$M(a,b,c) = \\begin{pmatrix} 1 & a & c \\\\ 0 & 1 & b \\\\ 0 & 0 & 1 \\end{pmatrix}, \\quad M(a,b,c)M(a',b',c') = M(a+a',\\; b+b',\\; c+c'+ab')$$ Son inverse est $M(a,b,c)^{-1} = M(-a, -b, ab - c)$ et son centre est $Z(H) = \\{M(0,0,c)\\}$.",
        intuition: "Abelyen olmayan grupların en klasik sınav örneğidir! Sağ üst köşedeki $c + c' + ab'$ terimindeki **$ab'$ çapraz çarpımı** yüzünden değişmeli değildir. Merkezde olmak için $ab' = a'b$ her $a', b'$ için sağlanmalı, yani $a = b = 0$ olmalıdır!",
        redaction: "Le produit dans le groupe de Heisenberg donne $M(a,b,c)M(a',b',c') = M(a+a', b+b', c+c'+ab')$."
    },

    // =========================================================================
    // 2. MAT201 — SERİLER VE DİZİLER (SUITES ET SÉRIES)
    // =========================================================================
    'theoreme_gendarmes': {
        title: "Théorème des Gendarmes & Convergence Monotone (Sıkıştırma ve Monotonluk)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "• **Théorème des Gendarmes :** Si $v_n \\le u_n \\le w_n$ à partir d'un certain rang et $\\lim v_n = \\lim w_n = \\ell$, alors $\\lim u_n = \\ell$.\n• **Théorème de la Limite Monotone :** Toute suite croissante majorée (resp. décroissante minorée) converge dans $\\mathbb{R}$.",
        intuition: "Dizilerde $\\lfloor nx \\rfloor / n$, $(-1)^n/n$ veya toplam sınırlandırma sorularında ilk işin alt ve üst sınır kurup Gendarmes uygulamaktır ($x - 1 < \\lfloor x \\rfloor \\le x$). Özyinelemeli ($u_{n+1}=f(u_n)$) dizilerde ise **Monotonluk + Sınırlılık** ikilisi kullanılır.",
        redaction: "Par encadrement et d'après le théorème des gendarmes, la suite $(u_n)$ converge vers $\\ell$."
    },
    'theoreme_point_fixe': {
        title: "Théorème du Point Fixe & Suites Récurrentes (Sabit Nokta ve Özyinelemeli Diziler)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "Soit $f : I \\to I$ une fonction continue définie sur un intervalle fermé $I \\subset \\mathbb{R}$. Si une suite récurrente définie par $u_0 \\in I$ et $u_{n+1} = f(u_n)$ converge vers une limite finie $\\ell \\in I$, alors $\\ell$ vérifie nécessairement l'équation de point fixe :\n$$f(\\ell) = \\ell$$\nDe plus, si $f$ est contractante sur $I$ ($|f'(x)| \\le k < 1$), le point fixe $\\ell$ est unique et la suite converge quel que soit $u_0 \\in I$.",
        intuition: "Özyinelemeli $u_{n+1} = f(u_n)$ dizilerinin sınav çözüm algoritması 3 temel adımdan oluşur:\n1. **Kararlılık ve Sınırlılık (Stabilité & Bornitude) :** $f(I) \\subset I$ olduğu gösterilir ve tümevarımla (par récurrence) $\\forall n \\in \\mathbb{N},\\; u_n \\in I$ ispatlanır.\n2. **Monotonluk (Monotonie) :** Ya $u_{n+1} - u_n = f(u_n) - u_n$ farkının işareti $u_n \\in I$ bilgisi kullanılarak incelenir, ya da $f$ artan ise $u_1 - u_0$ işaretine göre tümevarımla $(u_n)$ dizisinin artan/azalan olduğu gösterilir.\n3. **Yakınsaklık ve Sabit Nokta :** Monoton ve sınırlı dizi yakınsar ($u_n \\to \\ell$). $f$ sürekli olduğundan $f(u_n) \\to f(\\ell)$ ve dolayısıyla $\\ell = f(\\ell)$ sabit nokta denklemi çözülür. $I$ aralığı dışındaki yabancı kökler elenir.",
        redaction: "Puisque $(u_n)$ converge vers une limite $\\ell \\in I$ et que la fonction $f$ est continue sur $I$, la limite $\\ell$ satisfait nécessairement l'équation de point fixe $f(\\ell) = \\ell$."
    },
    'equivalence_series_positives': {
        title: "Principe d'Équivalence & Comparaison des Séries à Termes Positifs (Eşdeğerlik Kriteri)",
        course: "mat201_seriler",
        badge: "Kriter • MAT201",
        definition: "Soient $\\sum u_n$ et $\\sum v_n$ deux séries à **termes strictement positifs** à partir d'un certain rang.\n• Si $u_n \\sim v_n$ ($n \\to +\\infty$), alors les deux séries $\\sum u_n$ et $\\sum v_n$ sont de **même nature** (toutes deux convergentes ou toutes deux divergentes).\n• De plus, si $\\sum u_n$ converge, les restes d'ordre $n$ sont équivalents : $R_n \\sim R_n'$. Si $\\sum u_n$ diverge, les sommes partielles sont équivalentes : $S_n \\sim S_n'$.",
        intuition: "Pozitif terimli serilerde en hızlı çözüm yoludur! $\\sin(x) \\sim x$, $\\ln(1+x) \\sim x$, $e^x - 1 \\sim x$ ($x \\to 0$) gibi temel Taylor/DL eşdeğerlikleri kullanılarak genel terim $u_n \\sim \\frac{1}{n^\\alpha}$ Riemann formuna indirgenir.",
        redaction: "Les séries $\\sum u_n$ et $\\sum v_n$ étant à termes strictement positifs avec $u_n \\sim_{n\\to+\\infty} v_n$, elles ont la même nature d'après le critère d'équivalence."
    },
    'suites_adjacentes_cauchy': {
        title: "Suites Adjacentes & Critère de Cauchy (Bitişik Diziler ve Cauchy Kriteri)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "• Deux suites $(u_n)$ et $(v_n)$ sont **adjacentes** si $(u_n)$ est croissante, $(v_n)$ est décroissante et $\\lim_{n\\to\\infty}(v_n - u_n) = 0$. Elles convergent alors vers la **même limite** $\\ell$ avec $u_n \\le \\ell \\le v_n$.\n• Dans $\\mathbb{R}$ (espace complet), toute suite de Cauchy converge.",
        intuition: "Özellikle alternatif toplamların ($S_{2n}$ ve $S_{2n+1}$ çift/tek kısmi toplamlarının) yakınsaklığını kanıtlarken $(S_{2n})$ artan, $(S_{2n+1})$ azalan ve farkları $u_{2n+1} \\to 0$ gösterilerek **Suites Adjacentes** teoremiyle tam puan alınır!",
        redaction: "Les suites $(u_n)$ et $(v_n)$ étant l'une croissante, l'autre décroissante avec $\\lim(v_n - u_n) = 0$, elles sont adjacentes et convergent donc vers une même limite finie."
    },
    'series_riemann_bertrand': {
        title: "Séries de Riemann & de Bertrand (Riemann ve Bertrand Referans Serileri)",
        course: "mat201_seriler",
        badge: "Kriter • MAT201",
        definition: "• **Série de Riemann :** $\\sum_{n\\ge 1} \\frac{1}{n^\\alpha}$ converge $\\iff \\alpha > 1$.\n• **Série de Bertrand :** $\\sum_{n\\ge 2} \\frac{1}{n^\\alpha (\\ln n)^\\beta}$ converge $\\iff (\\alpha > 1)$ ou $(\\alpha = 1 \\text{ et } \\beta > 1)$.\n• **Série Géométrique :** $\\sum_{n\\ge 0} q^n$ converge $\\iff |q| < 1$, de somme $\\frac{1}{1-q}$.",
        intuition: "Pozitif terimli her seriyi Taylor/eşdeğerlik ($u_n \\sim v_n$) açılımı yaptıktan sonra sonunda mutlaka bir **Riemann** veya **Bertrand** serisiyle karşılaştıracaksın! Unutma: $\\alpha = 1$ sınır çizgisidir (Harmonik seri $\\sum 1/n$ ıraksar, $\\sum 1/(n \\ln^2 n)$ yakınsar).",
        redaction: "Par équivalence de séries à termes positifs, $u_n \\sim \\frac{c}{n^\\alpha}$, qui est le terme général d'une série de Riemann convergente car $\\alpha > 1$."
    },
    'theoreme_dalembert': {
        title: "Règle de d'Alembert (d'Alembert Oran Testi)",
        course: "mat201_seriler",
        badge: "Kriter • MAT201",
        definition: "Soit $\\sum u_n$ une série à termes strictement positifs telle que $\\lim_{n\\to\\infty} \\frac{u_{n+1}}{u_n} = L \\in [0, +\\infty]$.\n• Si **$L < 1$**, la série **converge**.\n• Si **$L > 1$**, la série **diverge grossièrement** ($u_n \\to +\\infty$).\n• Si **$L = 1$**, cas douteux (on fait un développement asymptotique).",
        intuition: "Genel terimde **faktöriyel ($n!$, $(2n)!$)**, çarpım sembolü veya üslü ifadeler ($a^n$) varsa hiç düşünmeden $u_{n+1}/u_n$ oranına bak! Dikkat: $(2(n+1))! = (2n+2)(2n+1)(2n)!$ olduğunu unutma.",
        redaction: "La série est à termes strictement positifs. Calculons le quotient de d'Alembert $\\frac{u_{n+1}}{u_n} \\xrightarrow[n\\to\\infty]{} L$. D'après la règle de d'Alembert, la série converge (si $L<1$)."
    },
    'critere_cauchy_racine': {
        title: "Critère de Cauchy / Racine n-ième (Cauchy Kök Testi)",
        course: "mat201_seriler",
        badge: "Kriter • MAT201",
        definition: "Soit $\\sum u_n$ une série à termes positifs telle que $\\lim_{n\\to\\infty} \\sqrt[n]{u_n} = \\lim (u_n)^{1/n} = L$.\n• Si **$L < 1$**, la série **converge**.\n• Si **$L > 1$**, la série **diverge grossièrement**.\n• Si **$L = 1$**, cas douteux.",
        intuition: "Genel terimin tamamının üzerinde $(\\dots)^n$ veya $(\\dots)^{n^2}$ kuvveti varsa (örneğin $\\left(\\frac{n}{n+1}\\right)^{n^2}$ veya $(\\ln n)^{-n}$), $(u_n)^{1/n}$ alarak dıştaki $n$ kuvvetini tek hamlede yok et!",
        redaction: "Par la règle de Cauchy pour les séries à termes positifs, $\\sqrt[n]{u_n} \\xrightarrow[n\\to\\infty]{} L < 1$, donc la série converge."
    },
    'critere_leibniz_series': {
        title: "Critère Spécial des Séries Alternées / Leibniz (Alternatif Seri Kriteri)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "Soit $u_n = (-1)^n a_n$ avec $a_n \\ge 0$. Si la suite $(a_n)$ est **décroissante** à partir d'un certain rang et **$\\lim_{n\\to\\infty} a_n = 0$**, alors :\n1. La série $\\sum (-1)^n a_n$ **converge**.\n2. Le reste $R_n = \\sum_{k=n+1}^\\infty (-1)^k a_k$ est du signe de son premier terme et vérifie **$|R_n| \\le a_{n+1}$**.",
        intuition: "⚠️ **Sınav Tuzağı:** İşaret değiştiren serilerde $u_n \\sim v_n$ eşdeğerliği **KULLANILAMAZ**! Eğer $|u_n|$ mutlak yakınsak değilse (örn: $\\frac{(-1)^n}{\\sqrt{n} + (-1)^n}$), ya Leibniz şartlarını (azalanlık + sıfıra gitme) kontrol et ya da Taylor açılımı yapıp terim terim parçala!",
        redaction: "La série $\\sum (-1)^n a_n$ est alternée et la suite $(a_n)$ est positive, décroissante et tend vers $0$ : elle converge donc d'après le critère spécial des séries alternées (Leibniz)."
    },
    'convergence_uniforme_sup': {
        title: "Convergence Simple & Uniforme des Suites de Fonctions (Düzgün Yakınsaklık)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "Soit $(f_n)$ une suite de fonctions sur $I$ qui converge simplement vers $f$ ($\\forall x \\in I,\\; f_n(x) \\to f(x)$). $(f_n)$ **converge uniformément** vers $f$ sur $I$ si : $$\\|f_n - f\\|_{\\infty, I} = \\sup_{x \\in I} |f_n(x) - f(x)| \\xrightarrow[n \\to +\\infty]{} 0$$ La convergence uniforme conserve la **continuité** et permet d'intervertir $\\lim$ et $\\int_{[a,b]}$.",
        intuition: "4 adımlı standart sınav algoritması:\n1) Noktasal limit $f(x)$'i bul.\n2) $\\Delta_n(x) = |f_n(x) - f(x)|$ fark fonksiyonunun türevini alıp tablosunu çizerek maksimum noktasını ($x_n$) bul.\n3) $M_n = \\Delta_n(x_n) \\to 0$ ise Düzgün Yakınsaktır!\n4) Eğer $f_n$ sürekli ama limit $f$ süreksizse, **hiç türev almadan** 'Düzgün yakınsaklık sürekliliği korur, dolayısıyla düzgün yakınsak değildir' de!",
        redaction: "Posons $M_n = \\sup_{x \\in I} |f_n(x) - f(x)|$. Comme $\\lim_{n\\to\\infty} M_n = 0$, la suite $(f_n)$ converge uniformément vers $f$ sur $I$."
    },
    'critere_weierstrass': {
        title: "Convergence Normale & Critère de Weierstrass (Normal Yakınsaklık)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "La série de fonctions $\\sum u_n(x)$ **converge normalement** sur $I$ s'il existe une suite numérique $(\\alpha_n)$ telle que $\\forall x \\in I,\\; |u_n(x)| \\le \\alpha_n$ (soit $\\|u_n\\|_{\\infty, I} \\le \\alpha_n$) et que la série numérique $\\sum \\alpha_n$ **converge**.\n**Chaîne d'implications :** Convergence Normale $\\implies$ Convergence Uniforme $\\implies$ Convergence Simple.",
        intuition: "Fonksiyon serilerinde ($\sum u_n(x)$) kısmi toplamların $\\sup$'unu almak imkansızdır; bunun yerine her bir terimin maksimumunu ($\\|u_n\\|_\\infty$) bulup sayısal serinin yakınsaklığına bakmak (**Normal Yakınsaklık**) en hızlı yoldur!",
        redaction: "Pour tout $x \\in I$, $|u_n(x)| \\le \\|u_n\\|_{\\infty, I} = \\alpha_n$ qui est le terme général d'une série numérique convergente : la série $\\sum u_n$ converge donc normalement (et par suite uniformément) sur $I$."
    },
    'continuite_uniforme': {
        title: "Continuité Uniforme & Théorème de Heine (Düzgün Süreklilik ve Heine Teoremi)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "$f : I \\to \\mathbb{R}$ est **uniformément continue** sur $I$ si : $$\\forall \\varepsilon > 0,\\; \\exists \\delta > 0,\\; \\forall x, y \\in I,\\quad |x - y| < \\delta \\implies |f(x) - f(y)| < \\varepsilon$$\n• **Théorème de Heine :** Toute fonction continue sur un segment compact $[a, b]$ est uniformément continue.\n• Si $|f'(x)| \\le M$ sur $I$ ($f$ $M$-lipschitzienne), alors $f$ est uniformément continue sur $I$.",
        intuition: "Düzgün sürekliliği **kanıtlamak** için: ya $[a,b]$ kapalı aralığında Heine kullan, ya da Ortalama Değer Teoremi (TAF) ile $|f'| \\le M$ gösterip Lipschitz yap. **Çürütmek** içinse ($x^2$ veya $\\sin(x^2)$ gibi): $|x_n - y_n| \\to 0$ iken $|f(x_n) - f(y_n)| \\not\\to 0$ olan iki dizi seç!",
        redaction: "D'après le théorème de Heine, comme $f$ est continue sur le segment compact $[a, b]$, elle y est uniformément continue."
    },
    'series_telescopiques_absolue': {
        title: "Séries Télescopiques & Convergence Absolue (Teleskopik Seriler ve Mutlak Yakınsaklık)",
        course: "mat201_seriler",
        badge: "Teorem • MAT201",
        definition: "• **Série télescopique :** $\\sum_{k=1}^n (a_{k+1} - a_k) = a_{n+1} - a_1$. La série converge $\\iff$ la suite $(a_n)$ converge vers $\\ell \\in \\mathbb{R}$, et sa somme vaut $\\ell - a_1$.\n• **Convergence absolue :** $\\sum |u_n|$ converge $\\implies \\sum u_n$ converge (et $|\\sum_{n=0}^\\infty u_n| \\le \\sum_{n=0}^\\infty |u_n|$). Une série convergente mais non absolument convergente est dite **semi-convergente**.",
        intuition: "Kesirli ifadelerde ($\\frac{1}{n(n+1)(n+2)}$ veya $\\ln(1 - 1/n^2)$) toplamın **tam değerini (somme exacte)** soruyorlarsa %99 basit kesirlere ayırıp kısmi toplam $S_N$ yazarak **Teleskopik** sadeleştirme yapacaksın!",
        redaction: "Par télescopage sur la somme partielle d'ordre $N$, on a $S_N = \\sum_{k=1}^N (a_{k+1} - a_k) = a_{N+1} - a_1 \\xrightarrow[N\\to\\infty]{} \\ell - a_1$."
    },

    // =========================================================================
    // 3. FIZ101 — FİZİK 1: MEKANİK (MÉCANIQUE DU POINT)
    // =========================================================================
    'produit_vectoriel_mixte': {
        title: "Produit Scalaire, Vectoriel & Mixte (Skaler, Vektörel ve Karma Çarpım)",
        course: "fiz101_fizik",
        badge: "Formül • FIZ101",
        definition: "• **Produit scalaire :** $\\vec{A} \\cdot \\vec{B} = \\|\\vec{A}\\|\\|\\vec{B}\\|\\cos\\theta$ (nul $\\iff \\vec{A} \\perp \\vec{B}$).\n• **Produit vectoriel :** $\\|\\vec{A} \\wedge \\vec{B}\\| = \\|\\vec{A}\\|\\|\\vec{B}\\|\\sin\\theta$ (aire du parallélogramme, nul $\\iff \\vec{A} \\parallel \\vec{B}$).\n• **Produit mixte :** $(\\vec{A}, \\vec{B}, \\vec{C}) = \\vec{A} \\cdot (\\vec{B} \\wedge \\vec{C}) = \\det(\\vec{A}, \\vec{B}, \\vec{C})$ (volume algébrique du parallélépipède, nul $\\iff$ vecteurs **coplanaires**).\n• **Double produit vectoriel :** $\\vec{A} \\wedge (\\vec{B} \\wedge \\vec{C}) = (\\vec{A}\\cdot\\vec{C})\\vec{B} - (\\vec{A}\\cdot\\vec{B})\\vec{C}$ (règle **BAC - CAB**).",
        intuition: "TD-1 sorularının şifresi:\n• 'Diklik / Açı bul' $\\implies$ Skaler çarpım $\\vec{A}\\cdot\\vec{B}$.\n• 'Hem $\\vec{A}$ hem $\\vec{B}$'ye dik birim vektör veya Üçgen Alanı ($S = \\frac{1}{2}\\|\\vec{A}\\wedge\\vec{B}\\|$)' $\\implies$ Vektörel çarpım.\n• 'Üç vektör aynı düzlemde mi (coplanaires)?' $\\implies$ Karma çarpım determinantı $= 0$.",
        redaction: "Les trois vecteurs $\\vec{A}, \\vec{B}, \\vec{C}$ sont coplanaires si et seulement si leur produit mixte $\\vec{A} \\cdot (\\vec{B} \\wedge \\vec{C}) = 0$."
    },
    'formule_poisson_frenet': {
        title: "Formule de Bour / Poisson & Base de Frenet (Birim Vektör Türevi ve Frenet Çatısı)",
        course: "fiz101_fizik",
        badge: "Teorem • FIZ101",
        definition: "• Pour tout vecteur unitaire $\\vec{u}(\\theta)$ tournant dans un plan : $\\frac{d\\vec{u}}{dt} = \\dot{\\theta}\\,\\vec{u}_\\perp = \\vec{\\Omega} \\wedge \\vec{u}$.\n• **Base de Frenet $(\\vec{u}_t, \\vec{u}_n)$ :** $$\\vec{v} = v\\,\\vec{u}_t, \\qquad \\vec{a} = \\underbrace{\\frac{dv}{dt}}_{a_t}\\vec{u}_t + \\underbrace{\\frac{v^2}{R}}_{a_n}\\vec{u}_n$$ D'où $a_t = \\frac{\\vec{a}\\cdot\\vec{v}}{v}$, $a_n = \\frac{\\|\\vec{v}\\wedge\\vec{a}\\|}{v} = \\sqrt{\\|\\vec{a}\\|^2 - a_t^2}$, et le rayon de courbure **$R = \\frac{v^2}{a_n} = \\frac{v^3}{\\|\\vec{v}\\wedge\\vec{a}\\|}$**.",
        intuition: "Sınavda eğrilik yarıçapı $R$ veya normal ivme $a_n$ sorulduğunda sakın $\\vec{u}_n$'yi türevle bulmaya çalışma! Önce Kartezyen/kutupsal bileşenlerden $\\vec{v}$ ve $\\vec{a}$'yı bul, sonra $a_t = \\frac{\\vec{a}\\cdot\\vec{v}}{v}$ (veya $\\frac{d\\|\\vec{v}\\|}{dt}$) hesapla, Pisagor'dan $a_n = \\sqrt{a^2 - a_t^2}$ ve $R = v^2 / a_n$ çek!",
        redaction: "Dans la base de Frenet $(\\vec{u}_t, \\vec{u}_n)$, l'accélération s'écrit $\\vec{a} = \\frac{dv}{dt}\\vec{u}_t + \\frac{v^2}{R}\\vec{u}_n$, d'où le rayon de courbure $R = \\frac{v^2}{a_n}$."
    },
    'cinematique_polaire': {
        title: "Cinématique en Coordonnées Polaires & Cylindriques (Kutupsal / Silindirik Kinematik)",
        course: "fiz101_fizik",
        badge: "Formül • FIZ101",
        definition: "Avec $\\frac{d\\vec{u}_r}{d\\theta} = \\vec{u}_\\theta$ et $\\frac{d\\vec{u}_\\theta}{d\\theta} = -\\vec{u}_r$, pour $\\vec{OM} = r\\,\\vec{u}_r + z\\,\\vec{u}_z$ :\n• **Vitesse :** $$\\vec{v} = \\dot{r}\\,\\vec{u}_r + r\\dot{\\theta}\\,\\vec{u}_\\theta + \\dot{z}\\,\\vec{u}_z$$\n• **Accélération :** $$\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\,\\vec{u}_r + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\,\\vec{u}_\\theta + \\ddot{z}\\,\\vec{u}_z$$ où $-r\\dot{\\theta}^2$ est l'accélération centripète et $2\\dot{r}\\dot{\\theta}$ le terme de Coriolis.",
        intuition: "⚠️ **Sınavda Ezbere Değil Türeterek Yaz:** Hocalar kutupsal hız ve ivme formülünün $\\vec{OM} = r\\vec{u}_r$'nin çarpım türeviyle çıkarılışını görmeyi çok sever! Ayrıca teğetsel ivme sıfırsa ($a_\\theta = 0$), $\\frac{1}{r}\\frac{d}{dt}(r^2\\dot{\\theta}) = 0 \\implies r^2\\dot{\\theta} = C$ (Alanlar Yasası / açısal momentum korunumu) elde edilir.",
        redaction: "En dérivant $\\vec{OM} = r\\vec{u}_r$ avec $\\dot{\\vec{u}}_r = \\dot{\\theta}\\vec{u}_\\theta$ et $\\dot{\\vec{u}}_\\theta = -\\dot{\\theta}\\vec{u}_r$, on obtient $\\vec{v} = \\dot{r}\\vec{u}_r + r\\dot{\\theta}\\vec{u}_\\theta$ et $\\vec{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\vec{u}_r + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\vec{u}_\\theta$."
    },

    // =========================================================================
    // 4. MAT206 — OLASILIK (PROBABILITÉS)
    // =========================================================================
    'denombrement_tirages': {
        title: "Modèles de Tirages & Dénombrement (Çekiliş Modelleri ve Kombinatorik)",
        course: "mat206_olasilik",
        badge: "Formül • MAT206",
        definition: "Pour tirer $p$ objets parmi $n$ :\n1. **Successif avec remise** ($p$-listes) : $n^p$ cas (ordre compte, répétition possible).\n2. **Successif sans remise** (arrangements $A_n^p$) : $\\frac{n!}{(n-p)!}$ cas (ordre compte, sans répétition).\n3. **Simultané** (combinaisons $\\binom{n}{p}$) : $\\frac{n!}{p!(n-p)!}$ cas (ordre ne compte pas).\n• **Formule de Vandermonde :** $\\sum_{k=0}^r \\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}$.",
        intuition: "Soruyu okurken ilk 5 saniyede şu 2 soruyu sor: **1) Sıra önemli mi?** (Simultane ise hayır $\\implies \\binom{n}{p}$). **2) Geri koyma (avec remise) var mı?**",
        redaction: "Le tirage étant simultané de $p$ éléments parmi $n$, l'univers $\\Omega$ est muni de l'équiprobabilité avec $|\\Omega| = \\binom{n}{p}$."
    },
    'formule_poincare': {
        title: "Formule du Crible de Poincaré / Inclusion-Exclusion (İçerme-Dışarma Formülü)",
        course: "mat206_olasilik",
        badge: "Teorem • MAT206",
        definition: "Pour toute famille finie d'événements $A_1, \\dots, A_n$ : $$P\\left(\\bigcup_{i=1}^n A_i\\right) = \\sum_{k=1}^n (-1)^{k-1} \\sum_{1 \\le i_1 < \\dots < i_k \\le n} P(A_{i_1} \\cap \\dots \\cap A_{i_k})$$",
        intuition: "'En az bir mektup doğru zarfa girsin' (dérangements / şapka problemi) veya 'En az bir kutu boş kalsın' sorularında kesişimlerin olasılığını hesaplamak birleşimden çok daha kolaydır! Simetri varsa toplamda $\\binom{n}{k}$ tane eşit terim gelir.",
        redaction: "D'après la formule du crible de Poincaré (inclusion-exclusion), $P(\\bigcup_{i=1}^n A_i) = \\sum_{k=1}^n (-1)^{k-1} \\binom{n}{k} P(A_1 \\cap \\dots \\cap A_k)$."
    },
    'theoreme_bayes_totales': {
        title: "Formule des Probabilités Totales & Théorème de Bayes",
        course: "mat206_olasilik",
        badge: "Teorem • MAT206",
        definition: "Soit $(B_1, \\dots, B_n)$ un **système complet d'événements** ($\\Omega = \\bigsqcup B_i$, $P(B_i) > 0$) :\n• **Probabilités Totales :** $$P(A) = \\sum_{i=1}^n P(A \\cap B_i) = \\sum_{i=1}^n P(A \\mid B_i) P(B_i)$$\n• **Formule de Bayes :** $$P(B_k \\mid A) = \\frac{P(A \\mid B_k) P(B_k)}{P(A)} = \\frac{P(A \\mid B_k) P(B_k)}{\\sum_{i=1}^n P(A \\mid B_i) P(B_i)}$$",
        intuition: "Zaman ileri akıyorsa ('1. kutudan 2. kutuya top atıldı, 2. kutudan kırmızı gelme olasılığı nedir?') **Tam Olasılık**; sonuç biliniyor ve geçmişteki sebebi soruyorsa ('Çekilen top kırmızı çıktı; bunun 1. kutudan gelmiş olma olasılığı nedir?') **Bayes Teoremi**! Çözüme başlarken mutlaka *'$(B_i)$ bir tam olaylar sistemidir (système complet d'événements)'* cümlesini yaz.",
        redaction: "La famille $(B_1, \\dots, B_n)$ formant un système complet d'événements de probabilités non nulles, d'après la formule des probabilités totales et la formule de Bayes :"
    },
    'loi_binomiale_poisson': {
        title: "Lois Usuelles : Binomiale, Poisson, Géométrique & Hypergéométrique",
        course: "mat206_olasilik",
        badge: "Formül • MAT206",
        definition: "• **Binomiale $X \\sim \\mathcal{B}(n, p)$ :** $P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}$, $E(X)=np$, $V(X)=np(1-p)$.\n• **Poisson $X \\sim \\mathcal{P}(\\lambda)$ :** $P(X=k) = e^{-\\lambda}\\frac{\\lambda^k}{k!}$, $E(X)=V(X)=\\lambda$.\n• **Géométrique $X \\sim \\mathcal{G}(p)$ :** $P(X=k) = (1-p)^{k-1}p$ ($k\\ge 1$, rang du 1er succès), $E(X)=\\frac{1}{p}$, $V(X)=\\frac{1-p}{p^2}$.",
        intuition: "• $n$ bağımsız denemede başarı sayısı $\\implies \\mathcal{B}(n,p)$.\n• İlk başarıya kadar geçen deneme sayısı (hafızasızlık özelliği!) $\\implies \\mathcal{G}(p)$.\n• Nadir olaylar ($n \\to \\infty, p \\to 0, np \\to \\lambda$) $\\implies \\mathcal{P}(\\lambda)$.",
        redaction: "$X$ compte le nombre de succès dans $n$ épreuves de Bernoulli indépendantes de paramètre $p$, donc $X \\sim \\mathcal{B}(n, p)$."
    },
    'formule_konig_huygens': {
        title: "Espérance, Théorème de Transfert & Formule de König-Huygens",
        course: "mat206_olasilik",
        badge: "Teorem • MAT206",
        definition: "• **Linéarité de l'espérance :** $E(aX + bY) = aE(X) + bE(Y)$ (**toujours vraie**, même sans indépendance !).\n• **Formule de König-Huygens :** $$V(X) = E(X^2) - [E(X)]^2$$\n• Pour les lois à valeurs entières ($\\mathbb{N}$) : $E[X(X-1)] = \\sum_{k\\ge 2} k(k-1)P(X=k)$, puis $E(X^2) = E[X(X-1)] + E(X)$.",
        intuition: "Poisson veya Binom dağılımında varyans hesaplarken direkt $\\sum k^2 P(X=k)$ açmaya çalışırsan $(k-1)!$ ile sadeleşme olmaz! Bunun yerine **$E[X(X-1)]$'i hesapla**, çünkü $k(k-1)/k! = 1/(k-2)!$ olarak harika sadeleşir, sonra König-Huygens'te yerine koy!",
        redaction: "Par la formule de König-Huygens, $V(X) = E(X^2) - E(X)^2 = E[X(X-1)] + E(X) - E(X)^2$."
    },
    'theoreme_central_limite': {
        title: "Inégalité de Bienaymé-Tchebychev, Loi des Grands Nombres & TCL",
        course: "mat206_olasilik",
        badge: "Teorem • MAT206",
        definition: "• **Markov ($X \\ge 0$) :** $P(X \\ge a) \\le \\frac{E(X)}{a}$.\n• **Bienaymé-Tchebychev :** $P(|X - E(X)| \\ge \\varepsilon) \\le \\frac{V(X)}{\\varepsilon^2}$.\n• **Théorème Central Limite (TCL) :** Pour $(X_i)$ i.i.d. d'espérance $\\mu$ et d'écart-type $\\sigma$ : $$Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} = \\frac{S_n - n\\mu}{\\sigma\\sqrt{n}} \\xrightarrow[n\\to\\infty]{\\mathcal{L}} \\mathcal{N}(0, 1)$$",
        intuition: "Soruda dağılım verilmemiş ve 'en az / en çok kaçtır' diye kaba bir sınır isteniyorsa **Bienaymé-Tchebychev**; $n \\ge 30$ bağımsız toplamın ($S_n$) yaklaşık olasılığı ve $\\Phi(z)$ tablosu verilmişse **Merkezi Limit Teoremi (TCL)** kullanılır!",
        redaction: "D'après le Théorème Central Limite (TCL), la variable centrée réduite $Z_n = \\frac{S_n - n\\mu}{\\sigma\\sqrt{n}}$ converge en loi vers $\\mathcal{N}(0, 1)$."
    },
    'independance_evenements': {
        title: "Indépendance d'Événements : Deux à Deux vs Mutuelle (Olayların Bağımsızlığı)",
        course: "mat206_olasilik",
        badge: "Tanım • MAT206",
        definition: "• Deux événements $A$ et $B$ sont **indépendants** si $P(A \\cap B) = P(A)P(B)$ (soit $P(A \\mid B) = P(A)$).\n• $A_1, \\dots, A_n$ sont **mutuellement indépendants** si pour **tout** sous-ensemble $I \\subset \\{1,\\dots,n\\}$, $P(\\bigcap_{i\\in I} A_i) = \\prod_{i\\in I} P(A_i)$.\n⚠️ L'indépendance deux à deux **n'implique pas** l'indépendance mutuelle (contre-exemple de Bernstein).",
        intuition: "Sınavda 3 olayın ($A, B, C$) karşılıklı bağımsız (mutuellement indépendants) olduğunu göstermek için **4 eşitliği birden** ($P(A\\cap B)$, $P(A\\cap C)$, $P(B\\cap C)$ VE $P(A\\cap B\\cap C) = P(A)P(B)P(C)$) kontrol etmek zorundasın! Ayrıca 'incompatibles' ($A\\cap B = \\emptyset$) ile 'indépendants' kavramlarını asla karıştırma.",
        redaction: "Les événements $A, B, C$ sont deux à deux indépendants mais ne sont pas mutuellement indépendants car $P(A \\cap B \\cap C) \\neq P(A)P(B)P(C)$."
    },
    'variables_densite_exponentielle': {
        title: "Variables à Densité & Loi Exponentielle (Yoğunluk Fonksiyonu ve Üstel Dağılım)",
        course: "mat206_olasilik",
        badge: "Teorem • MAT206",
        definition: "• $f : \\mathbb{R} \\to \\mathbb{R}_+$ est une **densité de probabilité** si $f \\ge 0$ et $\\int_{-\\infty}^{+\\infty} f(t)\\,dt = 1$. La fonction de répartition est $F_X(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt$.\n• **Loi Exponentielle $X \\sim \\mathcal{E}(\\lambda)$ :** $f(x) = \\lambda e^{-\\lambda x}\\mathbf{1}_{x \\ge 0}$, $P(X > t) = e^{-\\lambda t}$, $E(X) = \\frac{1}{\\lambda}$, $V(X) = \\frac{1}{\\lambda^2}$. Caractérisée par l'**absence de mémoire** : $P(X > t+s \\mid X > s) = P(X > t)$.",
        intuition: "Sürekli dağılımlarda tek bir noktanın olasılığı her zaman sıfırdır ($P(X=a)=0$)! $c$ sabitini bulmak için yoğunluğun integralini $1$'e eşitle; beklenen değer $E(X) = \\int x f(x)\\,dx$ hesabında $x e^{-\\lambda x}$ çıkarsa **kısmi integrasyon (intégration par parties)** uygula.",
        redaction: "Pour que $f$ soit une densité de probabilité, il faut et il suffit que $f \\ge 0$ presque partout et que $\\int_{-\\infty}^{+\\infty} f(t)\\,dt = 1$."
    }
};
