const conceptsDB = {
            'identite_bezout': {
                title: 'Identité de Bézout (Bézout Özdeşliği ve Teoremi)',
                definition: `Soient $a, b \\in \\mathbb{Z}$ deux entiers non tous deux nuls, et $d = \\operatorname{pgcd}(a, b)$.  
                Alors il existe deux entiers relatifs $u, v \\in \\mathbb{Z}$ (appelés coefficients de Bézout) tels que :
                $$\\mathbf{a \\cdot u + b \\cdot v = \\operatorname{pgcd}(a, b)}$$
                <strong>Corollaire Fondamental (Inversibilité Modulaire) :</strong>  
                $a$ et $b$ sont premiers entre eux ($\\operatorname{pgcd}(a, b) = 1$) si et seulement si :
                $$\\mathbf{a \\cdot u + b \\cdot v = 1}$$`,
                intuition: `Öklid bölmelerini sondan başa doğru sararak kalanı 1 olan eşitliği yazarız: $26u + 7v = 1$.  
                Modulo 26 dünyasına geçtiğimizde $26u \\equiv 0$ olur ve geriye $7v \\equiv 1$ kalır.  
                Yani $v$ sayısı tam olarak $7$'nin mod 26'daki tersidir! Tek yapman gereken $v$ negatifse ona 26 eklemektir.`
            },
            'element_inversible': {
                title: 'Élément Inversible dans $\\mathbb{Z}_n$ (Modüler Tersinirlik Şartı)',
                definition: `Dans l'anneau $(\\mathbb{Z}_n, +, \\cdot)$, une classe d'équivalence $\\bar{a}$ admet un inverse multiplicatif (notée $\\bar{a} \\in \\mathbb{Z}_n^*$) si et seulement si :
                $$\\mathbf{\\operatorname{pgcd}(a, n) = 1}$$`,
                intuition: `Bir sayının mod $n$'de tersinin olması, o sayının $n$ ile aralarında asal olmasına bağlıdır. Ortak bölenleri varsa katları asla 1 kalanını veremez.`
            },
            'groupe_abelien': {
                title: 'Groupe Abélien (Değişmeli Grup Tanımı)',
                definition: `Un groupe $(G, \\star)$ est dit <strong>abélien</strong> (ou commutatif) si sa loi de composition interne vérifie :
                $$\\mathbf{\\forall x, y \\in G, \\quad x \\star y = y \\star x}$$`,
                intuition: `Elemanların çarpım sırası önemsizdir. Normalde genel gruplarda $(xy)^{-1} = y^{-1}x^{-1}$ (sıra ters döner) iken, Abelyen grupta $x^{-1}y^{-1}$ olarak düz yazılabilir.`
            },
            'relation_diedrale': {
                title: 'Relation de Commutation Diédrique dans $\\mathcal{D}_n$',
                definition: `Dans le groupe diédrique $\\mathcal{D}_n = \\langle r, s \\mid r^n = e, s^2 = e \\rangle$, la relation fondamentale reliant rotation ($r$) et réflexion ($s$) est :
                $$\\mathbf{s \\cdot r = r^{-1} \\cdot s \\iff s \\cdot r^k = r^{-k} \\cdot s \\quad (\\forall k \\in \\mathbb{Z})}$$`,
                intuition: `Karenin arkasını çevirdiğinde (yansıma $s$), saat yönündeki bir dönüş saat yönünün tersine döner. $s$ harfini sağa geçirirken $r$'nin üssü eksiye döner.`
            },
            'centre_groupe': {
                title: 'Centre d\'un Groupe $Z(G)$ (Grubun Merkezi)',
                definition: `Le centre d'un groupe $G$, noté $Z(G)$, est le sous-groupe formé des éléments qui commutent avec TOUS les éléments du groupe :
                $$\\mathbf{Z(G) = \\{ z \\in G \\mid \\forall g \\in G, \\, z \\cdot g = g \\cdot z \\}}$$`,
                intuition: `Grubun herkesle anlaşan, yer değiştirebilen elemanlarıdır. $\\mathcal{D}_4$'te sadece $e$ ve $180^\\circ$ dönüş ($r^2$) herkesle yer değiştirebilir: $Z(\\mathcal{D}_4) = \\{e, r^2\\}$.`
            },
            'ordre_element': {
                title: 'Ordre d\'un Élément $o(g)$ (Elemanın Mertebesi)',
                definition: `L'ordre d'un élément $g \\in G$ est le plus petit entier strictement positif $m \\in \\mathbb{N}^*$ tel que :
                $$\\mathbf{g^m = e}$$
                Dans le groupe additif cyclique $\\mathbb{Z}_n$, l'ordre d'une classe $\\bar{a}$ est :
                $$\\mathbf{o(\\bar{a}) = \\frac{n}{\\operatorname{pgcd}(a, n)}}$$`,
                intuition: `Elemanı ardı ardına eklediğinde ne zaman sıfıra (birim elemana) döner? Modun EBOB'a oranı doğrudan mertebeyi verir.`
            },
            'indicatrice_euler': {
                title: 'Indicatrice d\'Euler $\\varphi(n)$ (Üreteç Sayısı)',
                definition: `La fonction indicatrice d'Euler $\\varphi(n)$ compte le nombre d'entiers dans $\\{1, 2, \\dots, n\\}$ premiers avec $n$ :
                $$\\mathbf{\\varphi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)}$$`,
                intuition: `$\\mathbb{Z}_n$ devirli grubunun tam olarak $\\varphi(n)$ tane üreteci vardır.`
            },
            'theoreme_fermat': {
                title: 'Petit Théorème de Fermat (Küçük Fermat Teoremi)',
                definition: `Si $p$ est un nombre premier et $a \\in \\mathbb{Z}$ est premier avec $p$ (i.e. $p \\nmid a$), alors :
                $$\\mathbf{a^{p-1} \\equiv 1 \\pmod p}$$`,
                intuition: `Üsleri mod $(p-1)$ altında indirgeyerek devasa kuvvetleri tek satırda küçültür.`
            },
            'theoreme_lagrange': {
                title: 'Théorème de Lagrange (Alt Grup Mertebesi Bölünürlüğü)',
                definition: `Pour tout groupe fini $G$ et tout sous-groupe $H \\leq G$ :
                $$\\mathbf{|H| \\text{ divise } |G|} \\quad \\text{et} \\quad [G : H] = \\frac{|G|}{|H|}$$
                En particulier, l'ordre de tout élément $o(g)$ divise $|G|$.`,
                intuition: `Bir grupta hiçbir alt grubun veya elemanın mertebesi, grubun toplam eleman sayısını bölmeyen bir sayı olamaz!`
            },
            'cycles_disjoints': {
                title: 'Cycles à Supports Disjoints (Ayrık Döngüler)',
                definition: `Deux cycles ont des supports disjoints s'ils n'opèrent sur aucun élément commun.  
                <strong>Théorème :</strong> Des cycles à supports disjoints commutent toujours :
                $$\\mathbf{c_1 \\circ c_2 = c_2 \\circ c_1}$$
                L'ordre du produit est le PPCM de leurs longueurs : $\\mathbf{o(\\sigma) = \\operatorname{ppcm}(l_1, l_2, \\dots)}$.`,
                intuition: `Farklı sayıları hareket ettiren döngüler birbirini etkilemez; serbestçe yer değiştirirler ve mertebeleri EKOK ile bulunur.`
            },
            'signature_permutation': {
                title: 'Signature d\'une Permutation $\\varepsilon(\\sigma)$',
                definition: `La signature est l'unique morphisme non trivial $\\varepsilon : \\mathcal{S}_n \\to \\{+1, -1\\}$.  
                Pour un cycle de longueur $k$ :
                $$\\mathbf{\\varepsilon(c) = (-1)^{k-1}}$$
                Pour un produit : $\\varepsilon(\\sigma_1 \\dots \\sigma_r) = \\prod \\varepsilon(\\sigma_i)$.`,
                intuition: `Döngü uzunluğu TEK ise imza $+1$ (Çift), ÇİFT ise imza $-1$ (Tek)'dir!`
            },
            'morphisme_groupes': {
                title: 'Morphisme de Groupes (İşlemi Koruyan Fonksiyon)',
                definition: `Une application $\\phi : (G, \\star) \\to (H, \\cdot)$ est un morphisme si :
                $$\\mathbf{\\forall x, y \\in G, \\quad \\phi(x \\star y) = \\phi(x) \\cdot \\phi(y)}$$
                Propriétés fondamentales : $\\phi(e_G) = e_H$ et $\\phi(x^{-1}) = [\\phi(x)]^{-1}$.`,
                intuition: `İki farklı grup cebirsel olarak aynı yapıyı paylaşıyorsa aralarındaki işlemi koruyan köprüdür.`
            }
        };

        function termLink(key, label) {
            return `<span class="term-link" onclick="openConceptModal('${key}')" title="Teoremi / Tanımı İncele">🔍 ${label}</span>`;
        }

        // ================= COMPREHENSIVE CURRICULUM WITH THEORY & MULTIPLE EXERCISES =================
