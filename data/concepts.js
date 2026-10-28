const conceptsDB = {
    'identite_bezout': {
        title: 'Identité de Bézout (Bézout Özdeşliği ve Teoremi)',
        definition: `Soient $a, b \\in \\mathbb{Z}$ deux entiers non tous deux nuls, et $d = \\operatorname{pgcd}(a, b)$.  
        Alors il existe deux entiers relatifs $u, v \\in \\mathbb{Z}$ (appelés coefficients de Bézout) tels que :
        $$\\mathbf{a \\cdot u + b \\cdot v = \\operatorname{pgcd}(a, b)}$$
        <strong>Corollaire Fondamental (Inversibilité Modulaire) :</strong>  
        $a$ et $b$ sont premiers entre eux ($\\operatorname{pgcd}(a, b) = 1$) si et seulement si :
        $$\\mathbf{a \\cdot u + b \\cdot v = 1}$$`,
        intuition: `Öklid algoritması tersten işletilerek kalanı 1 olan doğrusal eşitlik yazılır: $26u + 7v = 1$. Modulo 26 aritmetiğine geçildiğinde $26u \\equiv 0$ olacağından geriye $7v \\equiv 1$ kalır. Dolayısıyla $v$ katsayısı, $7$'nin mod 26'daki çarpımsal tersidir. $v$ negatif çıktığı takdirde üzerine modül (26) eklenerek pozitif denklik sınıfı elde edilir.`
    },
    'element_inversible': {
        title: 'Élément Inversible dans $\\mathbb{Z}_n$ (Modüler Tersinirlik Şartı)',
        definition: `Dans l'anneau $(\\mathbb{Z}_n, +, \\cdot)$, une classe d'équivalence $\\bar{a}$ admet un inverse multiplicatif (notée $\\bar{a} \\in \\mathbb{Z}_n^*$) si et seulement si :
        $$\\mathbf{\\operatorname{pgcd}(a, n) = 1}$$`,
        intuition: `Bir $\\bar{a}$ sınıfının mod $n$'de çarpımsal tersinin bulunması, $a$ ile $n$'nin aralarında asal ($\\operatorname{pgcd}(a, n) = 1$) olmasına denktir. Ortak bölen varlığında katlar hiçbir zaman 1 kalanını veremez.`
    },
    'groupe_abelien': {
        title: 'Groupe Abélien (Değişmeli Grup Tanımı)',
        definition: `Un groupe $(G, \\star)$ est dit <strong>abélien</strong> (ou commutatif) si sa loi de composition interne vérifie :
        $$\\mathbf{\\forall x, y \\in G, \\quad x \\star y = y \\star x}$$`,
        intuition: `Grup elemanlarının işlem sırası değişmelidir (komütatiflik). Genel gruplarda ters eleman kuralı $(xy)^{-1} = y^{-1}x^{-1}$ şeklinde sıra değiştirirken, Abelyen gruplarda doğrudan $x^{-1}y^{-1}$ biçiminde yazılabilir.`
    },
    'relation_diedrale': {
        title: 'Relation de Commutation Diédrique dans $\\mathcal{D}_n$',
        definition: `Dans le groupe diédrique $\\mathcal{D}_n = \\langle r, s \\mid r^n = e, s^2 = e \\rangle$, la relation fondamentale reliant rotation ($r$) et réflexion ($s$) est :
        $$\\mathbf{s \\cdot r = r^{-1} \\cdot s \\iff s \\cdot r^k = r^{-k} \\cdot s \\quad (\\forall k \\in \\mathbb{Z})}$$`,
        intuition: `Geometrik olarak düzlem yansıtıldığında (yansıma $s$), dönme yönü tersine döner. Cebirsel ifadede $s$ elemanı sağa aktarılırken $r$ dönme elemanının kuvvetinin işareti tersine çevrilir ($s \\cdot r^k = r^{-k} \\cdot s$).`
    },
    'centre_groupe': {
        title: 'Centre d\'un Groupe $Z(G)$ (Grubun Merkezi)',
        definition: `Le centre d'un groupe $G$, noté $Z(G)$, est le sous-groupe formé des éléments qui commutent avec TOUS les éléments du groupe :
        $$\\mathbf{Z(G) = \\{ z \\in G \\mid \\forall g \\in G, \\, z \\cdot g = g \\cdot z \\}}$$`,
        intuition: `Grubun tüm elemanlarıyla değişmeli olan elemanların oluşturduğu alt gruptur. $\\mathcal{D}_4$ diedral grubunda yalnızca birim eleman $e$ ile $180^\\circ$ dönme $r^2$ tüm elemanlarla yer değiştirir: $Z(\\mathcal{D}_4) = \\{e, r^2\\}$.`
    },
    'ordre_element': {
        title: 'Ordre d\'un Élément $o(g)$ (Elemanın Mertebesi)',
        definition: `L'ordre d'un élément $g \\in G$ est le plus petit entier strictement positif $m \\in \\mathbb{N}^*$ tel que :
        $$\\mathbf{g^m = e}$$
        Dans le groupe additif cyclique $\\mathbb{Z}_n$, l'ordre d'une classe $\\bar{a}$ est :
        $$\\mathbf{o(\\bar{a}) = \\frac{n}{\\operatorname{pgcd}(a, n)}}$$`,
        intuition: `Elemanın ardışık işlem sonucu birim elemana ulaştığı en küçük pozitif kuvvettir. Modüler devirli gruplarda grup mertebesinin EBOB'a oranı elemanın mertebesini verir: $o(\\bar{a}) = \\frac{n}{\\operatorname{pgcd}(a, n)}$.`
    },
    'indicatrice_euler': {
        title: 'Indicatrice d\'Euler $\\varphi(n)$ (Üreteç Sayısı)',
        definition: `La fonction indicatrice d'Euler $\\varphi(n)$ compte le nombre d'entiers dans $\\{1, 2, \\dots, n\\}$ premiers avec $n$ :
        $$\\mathbf{\\varphi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)}$$`,
        intuition: `$\\mathbb{Z}_n$ devirli grubunun üreteç sayısı, $n$ ile aralarında asal ve $n$'den küçük pozitif tam sayıların sayısına ($\\varphi(n)$) eşittir.`
    },
    'theoreme_fermat': {
        title: 'Petit Théorème de Fermat (Küçük Fermat Teoremi)',
        definition: `Si $p$ est un nombre premier et $a \\in \\mathbb{Z}$ est premier avec $p$ (i.e. $p \\nmid a$), alors :
        $$\\mathbf{a^{p-1} \\equiv 1 \\pmod p}$$`,
        intuition: `Asal modüllerde büyük kuvvetleri mod $(p-1)$ aritmetiğinde indirgeyerek yüksek üslerin kolayca hesaplanmasını sağlar.`
    },
    'theoreme_lagrange': {
        title: 'Théorème de Lagrange (Alt Grup Mertebesi Bölünürlüğü)',
        definition: `Pour tout groupe fini $G$ et tout sous-groupe $H \\leq G$ :
        $$\\mathbf{|H| \\text{ divise } |G|} \\quad \\text{et} \\quad [G : H] = \\frac{|G|}{|H|}$$
        En particulier, l'ordre de tout élément $o(g)$ divise $|G|$.`,
        intuition: `Sonlu bir grupta herhangi bir alt grubun mertebesi (ve dolayısıyla her elemanın mertebesi), grubun mertebesini tam bölmek zorundadır ($|H| \\mid |G|$).`
    },
    'cycles_disjoints': {
        title: 'Cycles à Supports Disjoints (Ayrık Döngüler)',
        definition: `Deux cycles ont des supports disjoints s'ils n'opèrent sur aucun élément commun.  
        <strong>Théorème :</strong> Des cycles à supports disjoints commutent toujours :
        $$\\mathbf{c_1 \\circ c_2 = c_2 \\circ c_1}$$
        L'ordre du produit est le PPCM de leurs longueurs : $\\mathbf{o(\\sigma) = \\operatorname{ppcm}(l_1, l_2, \\dots)}$.`,
        intuition: `Ayrık elemanları dönüştüren döngüler birbiriyle değişmelidir ($c_1 \\circ c_2 = c_2 \\circ c_1$). Bileşke permütasyonun mertebesi ise döngü uzunluklarının en küçük ortak katıdır (EKOK / PPCM).`
    },
    'signature_permutation': {
        title: 'Signature d\'une Permutation $\\varepsilon(\\sigma)$',
        definition: `La signature est l'unique morphisme non trivial $\\varepsilon : \\mathcal{S}_n \\to \\{+1, -1\\}$.  
        Pour un cycle de longueur $k$ :
        $$\\mathbf{\\varepsilon(c) = (-1)^{k-1}}$$
        Pour un produit : $\\varepsilon(\\sigma_1 \\dots \\sigma_r) = \\prod \\varepsilon(\\sigma_i)$.`,
        intuition: `Döngü uzunluğu $k$ tek sayı ise imza $+1$ (çift permütasyon), $k$ çift sayı ise imza $-1$ (tek permütasyon) değerini alır.`
    },
    'morphisme_groupes': {
        title: 'Morphisme de Groupes (İşlemi Koruyan Fonksiyon)',
        definition: `Une application $\\phi : (G, \\star) \\to (H, \\cdot)$ est un morphisme si :
        $$\\mathbf{\\forall x, y \\in G, \\quad \\phi(x \\star y) = \\phi(x) \\cdot \\phi(y)}$$
        Propriétés fondamentales : $\\phi(e_G) = e_H$ et $\\phi(x^{-1}) = [\\phi(x)]^{-1}$.`,
        intuition: `İki farklı grup yapısı arasında işlemleri ve birim/ters eleman özelliklerini muhafaza eden fonksiyonel dönüşümdür.`
    }
};

function termLink(key, label) {
    return `<span class="term-link" onclick="openConceptModal('${key}')" title="Teoremi / Tanımı İncele">🔍 ${label}</span>`;
}
