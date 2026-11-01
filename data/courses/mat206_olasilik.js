window.COURSES_DB = window.COURSES_DB || {};
window.COURSES_DB['mat206_olasilik'] = {
  "id": "mat206_olasilik",
  "code": "MAT206",
  "title": "Olasılık (Probabilités & Statistique)",
  "shortTitle": "Olasılık",
  "faculty": "Matematik Lisans • Galatasaray Üniversitesi",
  "instructor": "MATH 331 / MAT 206 Kürsüsü",
  "color": "#10b981",
  "icon": "dice",
  "modules": {
    "olasilik_mod1": {
      "id": "olasilik_mod1",
      "title": "Modül 1: Kombinatorik, Dénombrement & Temel Sayma Özdeşlikleri",
      "shortTitle": "1. Kombinatorik & Sayma",
      "breadcrumb": "MAT206 > Modül 1",
      "theoryPages": [
        {
          "title": "Sayfa 1: Sayma İlkeleri & Çekiliş Modelleri",
          "html": "\n<div class=\"theory-section\">\n  <h2>1. Principes Fondamentaux de Dénombrement & Modèles de Tirage</h2>\n  <p>Galatasaray Üniversitesi <strong>MATH331 Probabilités</strong> dersinin ilk bölümü, sonlu örneklem uzaylarında olayların sayılmasına (<span class=\"term-link\" onclick=\"openConceptModal('denombrement_tirages')\">dénombrement</span>) ve kombinatorik modellere ayrılmıştır (Sheldon Ross Bölüm 1).</p>\n  \n  <div class=\"academic-definition-box\">\n    <h4>Temel Sayma İlkeleri (Principe Fondamental)</h4>\n    <p>Bir deney $k$ ardışık aşamadan oluşuyorsa ve $i$-inci aşamanın $n_i$ farklı olası sonucu varsa, deneyin toplam olası sonuç sayısı çarpım kuralı ile verilir :</p>\n    $$N = n_1 \times n_2 \times \\cdots \times n_k$$\n  </div>\n\n  <div class=\"academic-definition-box\">\n    <h4>4 Temel Çekiliş Modeli ($n$ elemandan $p$ tane seçme)</h4>\n    <ul>\n      <li><strong>Tirage successif avec remise (İadeli ardışık çekiliş):</strong> Sıra önemlidir, aynı eleman tekrar seçilebilir ($p$-listeler). Toplam sonuç: <strong>$n^p$</strong>.</li>\n      <li><strong>Tirage successif sans remise (İadesiz ardışık çekiliş):</strong> Sıra önemlidir, tekrara izin verilmez (Düzenleme / Arrangements). Toplam sonuç: <strong>$A_n^p = \frac{n!}{(n - p)!}$</strong>.</li>\n      <li><strong>Tirage simultané (Aynı anda çekiliş):</strong> Sıra önemsizdir, tekrara izin verilmez (Kombinasyon). Toplam sonuç: <strong>$\binom{n}{p} = \frac{n!}{p!(n - p)!}$</strong>.</li>\n      <li><strong>Coefficients multinomiaux (Çoklu Bölüştürme):</strong> $n$ farklı nesneyi $n_1 + \\dots + n_r = n$ olacak şekilde $r$ ayrık gruba paylaştırma sayısı: <strong>$\binom{n}{n_1, \\dots, n_r} = \frac{n!}{n_1! \\cdots n_r!}$</strong>.</li>\n    </ul>\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 2: Kombinatorik Özdeşlikler & İspatlar",
          "html": "\n<div class=\"theory-section\">\n  <h2>2. Identités Combinatoires Clés & Double Comptage</h2>\n  <p>GSÜ sınavlarında hocanın en çok puan verdiği soru tiplerinden biri <strong>kombinatorik özdeşliklerin kombinatorik argümanla (par double comptage) ispatıdır</strong> (2022 DS Soru 5-6, 2024 DS Soru 9).</p>\n\n  <div class=\"academic-theorem-card\">\n    <h4>Théorème : Identité de Vandermonde</h4>\n    $$\binom{n + m}{r} = \\sum_{k=0}^r \binom{n}{k} \binom{m}{r - k}$$\n    <p><strong>Özel Durum ($m = n$ ve $r = n$) :</strong> $\binom{2n}{n} = \\sum_{k=0}^n \binom{n}{k}^2$.</p>\n  </div>\n\n  <div class=\"academic-theorem-card\">\n    <h4>Théorème : Identité des Comités avec Dirigeants</h4>\n    $$\\sum_{k=1}^n \binom{n}{k} k = n \\cdot 2^{n - 1}$$\n    $$\\sum_{k=1}^n \binom{n}{k} k^2 = 2^{n - 2} n(n + 1)$$\n    $$\\sum_{k=1}^n \binom{n}{k} k^3 = 2^{n - 3} n^2(n + 3)$$\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 3: Sınav Mantığı & Rédaction Şablonu",
          "html": "\n<div class=\"theory-section\">\n  <h2>3. Sınav Mantığı, Sık Yapılan Hatalar & Rédaction Şablonu</h2>\n  \n  <div class=\"intuition-callout\">\n    <strong>💡 Sınav Taktik Notu (Double Comptage):</strong><br>\n    Sınavda bir toplam özdeşliği sorulduğunda cebirsel açılım yapmaya kalkışmak zaman kaybettirir ve hocadan tam puan alamazsınız! Daima şu 2 adımlı şablonu Fransızca olarak yazın:<br>\n    1) <em>« Méthode 1 : Choisissons d'abord la taille $k$ du comité ($\binom{n}{k}$ façons), puis choisissons ses dirigeants... »</em><br>\n    2) <em>« Méthode 2 : Choisissons d'abord les dirigeants (selon qu'ils coïncident ou non), puis complétons le comité avec les membres restants... »</em>\n  </div>\n\n  <div class=\"academic-definition-box\">\n    <h4>Topların Bölmelere Dağıtımı (Balles et Compartiments)</h4>\n    <p>$n$ ayırt edilebilir topun $N$ farklı kutuya rastgele dağıtılmasında örneklem uzayı $N^n$'dir. Herhangi bir kutuya tam $m$ top düşmesi Binom modelidir: $\binom{n}{m}(1/N)^m(1 - 1/N)^{n-m}$.</p>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "\n<div class=\"theory-section\">\n  <h2>1. Principes Fondamentaux de Dénombrement & Modèles de Tirage</h2>\n  <p>Galatasaray Üniversitesi <strong>MATH331 Probabilités</strong> dersinin ilk bölümü, sonlu örneklem uzaylarında olayların sayılmasına (<span class=\"term-link\" onclick=\"openConceptModal('denombrement_tirages')\">dénombrement</span>) ve kombinatorik modellere ayrılmıştır (Sheldon Ross Bölüm 1).</p>\n  \n  <div class=\"academic-definition-box\">\n    <h4>Temel Sayma İlkeleri (Principe Fondamental)</h4>\n    <p>Bir deney $k$ ardışık aşamadan oluşuyorsa ve $i$-inci aşamanın $n_i$ farklı olası sonucu varsa, deneyin toplam olası sonuç sayısı çarpım kuralı ile verilir :</p>\n    $$N = n_1 \times n_2 \times \\cdots \times n_k$$\n  </div>\n\n  <div class=\"academic-definition-box\">\n    <h4>4 Temel Çekiliş Modeli ($n$ elemandan $p$ tane seçme)</h4>\n    <ul>\n      <li><strong>Tirage successif avec remise (İadeli ardışık çekiliş):</strong> Sıra önemlidir, aynı eleman tekrar seçilebilir ($p$-listeler). Toplam sonuç: <strong>$n^p$</strong>.</li>\n      <li><strong>Tirage successif sans remise (İadesiz ardışık çekiliş):</strong> Sıra önemlidir, tekrara izin verilmez (Düzenleme / Arrangements). Toplam sonuç: <strong>$A_n^p = \frac{n!}{(n - p)!}$</strong>.</li>\n      <li><strong>Tirage simultané (Aynı anda çekiliş):</strong> Sıra önemsizdir, tekrara izin verilmez (Kombinasyon). Toplam sonuç: <strong>$\binom{n}{p} = \frac{n!}{p!(n - p)!}$</strong>.</li>\n      <li><strong>Coefficients multinomiaux (Çoklu Bölüştürme):</strong> $n$ farklı nesneyi $n_1 + \\dots + n_r = n$ olacak şekilde $r$ ayrık gruba paylaştırma sayısı: <strong>$\binom{n}{n_1, \\dots, n_r} = \frac{n!}{n_1! \\cdots n_r!}$</strong>.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>2. Identités Combinatoires Clés & Double Comptage</h2>\n  <p>GSÜ sınavlarında hocanın en çok puan verdiği soru tiplerinden biri <strong>kombinatorik özdeşliklerin kombinatorik argümanla (par double comptage) ispatıdır</strong> (2022 DS Soru 5-6, 2024 DS Soru 9).</p>\n\n  <div class=\"academic-theorem-card\">\n    <h4>Théorème : Identité de Vandermonde</h4>\n    $$\binom{n + m}{r} = \\sum_{k=0}^r \binom{n}{k} \binom{m}{r - k}$$\n    <p><strong>Özel Durum ($m = n$ ve $r = n$) :</strong> $\binom{2n}{n} = \\sum_{k=0}^n \binom{n}{k}^2$.</p>\n  </div>\n\n  <div class=\"academic-theorem-card\">\n    <h4>Théorème : Identité des Comités avec Dirigeants</h4>\n    $$\\sum_{k=1}^n \binom{n}{k} k = n \\cdot 2^{n - 1}$$\n    $$\\sum_{k=1}^n \binom{n}{k} k^2 = 2^{n - 2} n(n + 1)$$\n    $$\\sum_{k=1}^n \binom{n}{k} k^3 = 2^{n - 3} n^2(n + 3)$$\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>3. Sınav Mantığı, Sık Yapılan Hatalar & Rédaction Şablonu</h2>\n  \n  <div class=\"intuition-callout\">\n    <strong>💡 Sınav Taktik Notu (Double Comptage):</strong><br>\n    Sınavda bir toplam özdeşliği sorulduğunda cebirsel açılım yapmaya kalkışmak zaman kaybettirir ve hocadan tam puan alamazsınız! Daima şu 2 adımlı şablonu Fransızca olarak yazın:<br>\n    1) <em>« Méthode 1 : Choisissons d'abord la taille $k$ du comité ($\binom{n}{k}$ façons), puis choisissons ses dirigeants... »</em><br>\n    2) <em>« Méthode 2 : Choisissons d'abord les dirigeants (selon qu'ils coïncident ou non), puis complétons le comité avec les membres restants... »</em>\n  </div>\n\n  <div class=\"academic-definition-box\">\n    <h4>Topların Bölmelere Dağıtımı (Balles et Compartiments)</h4>\n    <p>$n$ ayırt edilebilir topun $N$ farklı kutuya rastgele dağıtılmasında örneklem uzayı $N^n$'dir. Herhangi bir kutuya tam $m$ top düşmesi Binom modelidir: $\binom{n}{m}(1/N)^m(1 - 1/N)^{n-m}$.</p>\n  </div>\n</div>\n",
      "concepts": [
        "denombrement_tirages",
        "loi_binomiale_poisson"
      ],
      "exercises": [
        {
          "id": "olas_2024_ex3",
          "name": "Exercice 1 (2024 DS • Soru 3)",
          "subtitle": "Distribution de n Balles dans N Compartiments",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "denombrement_tirages",
            "loi_binomiale_poisson"
          ],
          "enonce": "Supposons que $n$ balles soient distribuées aléatoirement dans $N$ compartiments.<br>Trouver la probabilité que $m$ balles ($0 \\le m \\le n$) tombent dans le premier compartiment. On suppose que toutes les $N^n$ dispositions sont équiprobables.",
          "hint": "Her topun 1. bölmeye düşme olasılığı p = 1/N'dir. Topların bağımsız dağıtılması bir Binom deneyidir.",
          "steps": [
            {
              "title": "Étape 1 : Cardinal de l'univers",
              "content": "Chaque balle a $N$ choix de compartiments indépendamment des autres. L'univers $\\Omega$ est l'ensemble des distributions possibles, de cardinal :<br>$$\\text{Card}(\\Omega) = N^n$$Toutes les dispositions étant supposées équiprobables, $P(E) = \\frac{\\text{Card}(E)}{\\text{Card}(\\Omega)}$."
            },
            {
              "title": "Étape 2 : Dénombrement des cas favorables",
              "content": "Pour que exactement $m$ balles tombent dans le premier compartiment :<br>1. On choisit quelles $m$ balles parmi les $n$ vont dans le premier compartiment : $\\binom{n}{m}$ choix.<br>2. Les $n - m$ balles restantes doivent être réparties dans les $N - 1$ autres compartiments : $(N - 1)^{n - m}$ choix.<br>Nombre de cas favorables :<br>$$\\text{Card}(E) = \\binom{n}{m} (N - 1)^{n - m}$$"
            },
            {
              "title": "Étape 3 : Calcul final",
              "content": "$$P(E) = \\frac{\\binom{n}{m} (N - 1)^{n - m}}{N^n} = \\binom{n}{m} \\left(\\frac{1}{N}\\right)^m \\left(\\frac{N - 1}{N}\\right)^{n - m} = \\binom{n}{m} \\left(\\frac{1}{N}\\right)^m \\left(1 - \\frac{1}{N}\\right)^{n - m}$$Il s'agit de la <span class=\"term-link\" onclick=\"openConceptModal('loi_binomiale_poisson')\">loi binomiale</span> $\\mathcal{B}(n, 1/N)$."
            }
          ]
        },
        {
          "id": "olas_2022_ex5",
          "name": "Exercice 2 (2022 DS • Soru 5)",
          "subtitle": "Identité de Vandermonde par Argument Combinatoire",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "denombrement_tirages"
          ],
          "enonce": "On considère un groupe de $m$ femmes et $n$ hommes. En étudiant le nombre possible des groupes de taille $r$, montrer que :<br>$$\\binom{n + m}{r} = \\binom{n}{0}\\binom{m}{r} + \\binom{n}{1}\\binom{m}{r - 1} + \\dots + \\binom{n}{r}\\binom{m}{0} = \\sum_{k=0}^r \\binom{n}{k}\\binom{m}{r - k}$$",
          "hint": "n+m kişilik topluluktan r kişilik grup seçmeyi, seçilen erkek sayısı k (0 <= k <= r) üzerinden parçalayarak sayın.",
          "steps": [
            {
              "title": "Étape 1 : Comptage global direct",
              "content": "Considérons l'ensemble des $n + m$ personnes. Le nombre total de façons de choisir un sous-groupe de taille $r$ est directement :<br>$$N = \\binom{n + m}{r}$$"
            },
            {
              "title": "Étape 2 : Partition selon le nombre d'hommes",
              "content": "Partitionnons l'ensemble de ces comités selon le nombre $k$ d'hommes choisis ($0 \\le k \\le r$).<br>Pour un entier $k$ fixé :<br>• On choisit $k$ hommes parmi les $n$ disponibles : $\\binom{n}{k}$ façons.<br>• On complète le comité avec $r - k$ femmes parmi les $m$ disponibles : $\\binom{m}{r - k}$ façons.<br>Ces choix étant indépendants, il y a $\\binom{n}{k}\\binom{m}{r - k}$ comités contenant exactement $k$ hommes."
            },
            {
              "title": "Étape 3 : Égalité par disjonction",
              "content": "Les cas correspondant à des valeurs distinctes de $k$ étant mutuellement exclusifs, la somme donne le total :<br>$$\\binom{n + m}{r} = \\sum_{k=0}^r \\binom{n}{k} \\binom{m}{r - k}$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex6",
          "name": "Exercice 3 (2022 DS • Soru 6)",
          "subtitle": "Somme des Carrés des Coefficients Binomiaux",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "denombrement_tirages"
          ],
          "enonce": "En utilisant l'exercice précédent (identité de Vandermonde), montrer que :<br>$$\\binom{2n}{n} = \\sum_{k=0}^n \\binom{n}{k}^2$$",
          "hint": "Vandermonde özdeşliğinde m = n ve r = n koyun, ardından simetri özelliğini kullanın.",
          "steps": [
            {
              "title": "Étape 1 : Substitution dans Vandermonde",
              "content": "Posons $m = n$ et $r = n$ dans l'identité de Vandermonde :<br>$$\\binom{n + n}{n} = \\binom{2n}{n} = \\sum_{k=0}^n \\binom{n}{k} \\binom{n}{n - k}$$"
            },
            {
              "title": "Étape 2 : Application de la symétrie",
              "content": "Par la propriété de symétrie des coefficients binomiaux, $\\binom{n}{n - k} = \\binom{n}{k}$.<br>On remplace dans la somme :<br>$$\\binom{2n}{n} = \\sum_{k=0}^n \\binom{n}{k} \\cdot \\binom{n}{k} = \\sum_{k=0}^n \\binom{n}{k}^2$$"
            }
          ]
        },
        {
          "id": "olas_2024_ex9a",
          "name": "Exercice 4 (2024 DS • Soru 9a)",
          "subtitle": "Identité du Comité avec Président et Secrétaire (k²)",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "denombrement_tirages"
          ],
          "enonce": "Montrer l'identité suivante :<br>$$\\sum_{k=1}^n \\binom{n}{k} k^2 = 2^{n - 2} n(n + 1)$$en répondant aux questions suivantes :<br>On considère un ensemble de $n$ personnes et on montre que les deux côtés représentent le nombre total de façons différentes de sélectionner un comité, son président et son secrétaire (le président et le secrétaire pouvant être la même personne).<br><br>(i) Combien de sélections différentes résultent dans un comité contenant exactement $k$ personnes ?<br>(ii) Combien de sélections sont possibles lorsque le président et le secrétaire sont la même personne ? (Réponse attendue : $n \\cdot 2^{n - 1}$)<br>(iii) Combien lorsque le président et le secrétaire sont distincts ?",
          "hint": "Çift sayım (double comptage) yöntemi: Önce komiteyi seçip liderleri belirlemek vs Önce liderleri seçip komiteyi tamamlamak.",
          "steps": [
            {
              "title": "Étape 1 : Réponse à la question (i) - Fixer la taille k",
              "content": "Pour former un comité de taille $k$ ($1 \\le k \\le n$), on choisit d'abord les $k$ membres parmi $n$ : $\\binom{n}{k}$ façons.<br>Une fois le comité fixé, il y a $k$ choix pour le président, et $k$ choix pour le secrétaire (indépendamment) : $k \\times k = k^2$ choix de dirigeants.<br>Nombre de sélections pour une taille $k$ fixée : $\\binom{n}{k} k^2$.<br>En sommant sur toutes les tailles $k \\in \\{1, \\dots, n\\}$, le total est :<br>$$N = \\sum_{k=1}^n \\binom{n}{k} k^2$$"
            },
            {
              "title": "Étape 2 : Réponse à la question (ii) - Président = Secrétaire",
              "content": "Il y a $n$ choix possibles pour cette personne unique qui cumule les deux fonctions.<br>Pour chacune des $n - 1$ autres personnes, on décide si elle fait partie ou non du comité : il y a $2^{n - 1}$ façons de compléter le comité.<br>Total pour ce cas : $n \\cdot 2^{n - 1} = 2n \\cdot 2^{n - 2}$."
            },
            {
              "title": "Étape 3 : Réponse à la question (iii) - Président ≠ Secrétaire & Conclusion",
              "content": "On choisit le président ($n$ choix) puis le secrétaire parmi les personnes restantes ($n - 1$ choix), soit $n(n - 1)$ couples.<br>Chacune des $n - 2$ autres personnes peut être dans le comité ou non ($2^{n - 2}$ façons).<br>Total pour ce cas : $n(n - 1) \\cdot 2^{n - 2}$.<br><br>En additionnant les deux cas disjoints :<br>$$N = 2n \\cdot 2^{n - 2} + n(n - 1) \\cdot 2^{n - 2} = 2^{n - 2} [2n + n^2 - n] = 2^{n - 2} n(n + 1)$$L'identité est démontrée."
            }
          ]
        },
        {
          "id": "olas_2024_ex9b",
          "name": "Exercice 5 (2024 DS • Soru 9b)",
          "subtitle": "Identité du Comité avec Trois Dirigeants (k³)",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "denombrement_tirages"
          ],
          "enonce": "Montrer que :<br>$$\\sum_{k=1}^n \\binom{n}{k} k^3 = 2^{n - 3} n^2 (n + 3)$$",
          "hint": "Bir komite, bir başkan, bir sekreter ve bir sayman (trésorier) seçtiğinizi düşünün. 1 kişi 3 görevi birden alabilir, 2 kişi görevleri paylaşabilir ya da 3 kişi tamamen farklı olabilir.",
          "steps": [
            {
              "title": "Étape 1 : Interprétation combinatoire",
              "content": "Le terme de gauche $\\sum_{k=1}^n \\binom{n}{k} k^3$ compte le nombre de façons de choisir un comité non vide muni de 3 rôles ordonnés (Président, Secrétaire, Trésorier)."
            },
            {
              "title": "Étape 2 : Décomposition selon le nombre de personnes distinctes",
              "content": "• <strong>Cas 1 (1 seule personne cumule les 3 rôles) :</strong> $n$ choix de personne, puis $2^{n - 1}$ façons pour le reste du comité : $n \\cdot 2^{n - 1} = 4n \\cdot 2^{n - 3}$.<br>• <strong>Cas 2 (Exactement 2 personnes distinctes pour les 3 rôles) :</strong> Il y a $\\binom{3}{2} = 3$ façons d'assigner quel rôle est dédoublé, $n(n - 1)$ choix ordonnés pour les deux personnes, et $2^{n - 2}$ choix pour les autres membres : $3n(n - 1) \\cdot 2 \\cdot 2^{n - 3} = 6n(n - 1) \\cdot 2^{n - 3}$.<br>• <strong>Cas 3 (3 personnes toutes distinctes) :</strong> $n(n - 1)(n - 2)$ choix de personnes, puis $2^{n - 3}$ façons pour les autres membres : $n(n - 1)(n - 2) \\cdot 2^{n - 3}$."
            },
            {
              "title": "Étape 3 : Factorisation finale",
              "content": "Mettons $2^{n - 3} n$ en facteur :<br>$$2^{n - 3} n [4 + 6(n - 1) + (n - 1)(n - 2)] = 2^{n - 3} n [4 + 6n - 6 + n^2 - 3n + 2]$$<br>$$= 2^{n - 3} n [n^2 + 3n] = 2^{n - 3} n^2(n + 3)$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex10",
          "name": "Exercice 6 (2022 DS • Soru 10)",
          "subtitle": "Nombres de Bell & Partitions d'un Ensemble Fini",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "denombrement_tirages"
          ],
          "enonce": "Soit $S$ un ensemble fini. Une partition de $S$ est une collection $\\{S_1, S_2, \\dots, S_k\\}$ des parties de $S$ qui sont mutuellement exclusives ($S_i \\cap S_j = \\emptyset$ si $i \\neq j$) et dont l'union est $S$.<br>Soit $T_n$ le nombre des partitions de l'ensemble $S_n := \\{1, 2, \\dots, n\\}$ (avec $T_0 = 1$).<br><br>Montrer que :<br>$$T_{n + 1} = 1 + \\sum_{k=1}^n \\binom{n}{k} T_k$$",
          "hint": "n+1 elemanının bulunduğu bloğu sabitleyin. Bu blok dışında kalan eleman sayısını k olarak adlandırın.",
          "steps": [
            {
              "title": "Étape 1 : Analyse du bloc contenant l'élément n+1",
              "content": "Considérons l'ensemble $S_{n+1} = \\{1, 2, \\dots, n, n+1\\}$. Dans toute partition, l'élément $n+1$ appartient à un unique bloc $B$."
            },
            {
              "title": "Étape 2 : Cas particulier et décomposition",
              "content": "• Si $B = S_{n+1}$ (tous les éléments sont dans le même bloc unique), il y a exactement $1$ partition.<br>• Sinon, soit $k$ le nombre d'éléments de $S_n = \\{1, \\dots, n\\}$ qui <strong>ne sont pas</strong> dans le bloc $B$ ($1 \\le k \\le n$).<br>Pour un $k$ fixé, il y a $\\binom{n}{k}$ façons de choisir ces $k$ éléments. Ces $k$ éléments doivent être partitionnés entre eux, ce qui offre $T_k$ possibilités.<br>Les $n - k$ éléments restants de $S_n$ sont automatiquement placés dans le bloc avec $n+1$."
            },
            {
              "title": "Étape 3 : Sommation",
              "content": "Par le principe d'addition :<br>$$T_{n + 1} = 1 + \\sum_{k=1}^n \\binom{n}{k} T_k$$"
            }
          ]
        }
      ]
    },
    "olasilik_mod2": {
      "id": "olasilik_mod2",
      "title": "Modül 2: Kolmogorov Aksiyomları & Olaylar Cebri",
      "shortTitle": "2. Olaylar Cebri & Aksiyomlar",
      "breadcrumb": "MAT206 > Modül 2",
      "theoryPages": [
        {
          "title": "Sayfa 1: Kolmogorov Aksiyomları & Olaylar",
          "html": "\n<div class=\"theory-section\">\n  <h2>1. Espace Fondamental & Axiomes de Kolmogorov</h2>\n  <p>Une expérience aléatoire est modélisée par un espace probabilisé $(\\Omega, \\mathcal{F}, P)$ où :</p>\n  <ul>\n    <li>$\\Omega$ est l'ensemble fondamental (univers de tous les résultats possibles $\\omega$).</li>\n    <li>$\\mathcal{F}$ est une tribu d'événements (fermé par passage au complémentaire et union dénombrable).</li>\n    <li>$P : \\mathcal{F} \\to [0, 1]$ est la mesure de probabilité vérifiant les <strong>Axiomes de Kolmogorov</strong> :</li>\n  </ul>\n  <div class=\"academic-definition-box\">\n    <ol>\n      <li><strong>Axiome 1 (Positivité) :</strong> Pour tout événement $E$, $0 \\le P(E) \\le 1$.</li>\n      <li><strong>Axiome 2 (Normalisation) :</strong> $P(\\Omega) = 1$.</li>\n      <li><strong>Axiome 3 ($\\sigma$-additivité) :</strong> Si $(E_n)_{n \\ge 1}$ est une suite d'événements disjoints deux à deux ($E_i \\cap E_j = \\emptyset$), alors $P\\left(\\bigcup_{n=1}^\\infty E_n\\right) = \\sum_{n=1}^\\infty P(E_n)$.</li>\n    </ol>\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 2: Olaylar Cebri & Poincaré",
          "html": "\n<div class=\"theory-section\">\n  <h2>2. Algèbre des Événements & <span class=\"term-link\" onclick=\"openConceptModal('formule_poincare')\">Formule de Poincaré</span> (Inclusion-Exclusion)</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Propriétés Fondamentales Déduites</h4>\n    <ul>\n      <li>$P(\\emptyset) = 0$ et $P(E^c) = 1 - P(E)$.</li>\n      <li><strong>Monotonie :</strong> Si $E \\subseteq F$, alors $P(E) \\le P(F)$ et $P(F \\setminus E) = P(F) - P(E)$.</li>\n      <li><strong>Formule de Poincaré (2 événements) :</strong> $P(E \\cup F) = P(E) + P(F) - P(E \\cap F)$.</li>\n      <li><strong>Exactement un seul des deux :</strong> $P((E \\cap F^c) \\cup (E^c \\cap F)) = P(E) + P(F) - 2P(E \\cap F)$.</li>\n      <li><strong>Lois de De Morgan :</strong> $(E \\cup F)^c = E^c \\cap F^c$ et $(E \\cap F)^c = E^c \\cup F^c$.</li>\n    </ul>\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 3: Sınav Mantığı & Küme Olasılığı",
          "html": "\n<div class=\"theory-section\">\n  <h2>3. Sınav Mantığı : İki Bağımsız Kümenin Kapsanması P(X ⊆ Y) = (3/4)ⁿ</h2>\n  <div class=\"intuition-callout\">\n    <strong>💡 2024 DS Sınav Sorusu Mantığı :</strong><br>\n    $A = \\{1, \\dots, n\\}$ kümesinin $2^n$ alt kümesinden bağımsız ve eş olasılıkla $X$ ve $Y$ seçildiğinde, $X \\subseteq Y$ olayını incelemenin iki yolu vardır :<br>\n    1) <strong>Eleman bazlı <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">bağımsızlık</span> :</strong> Her $a \\in A$ elemanı için 4 olası durum vardır: $(a \\notin X, a \\notin Y), (a \\notin X, a \\in Y), (a \\in X, a \\in Y)$ ve $(a \\in X, a \\notin Y)$. İlk 3 durum $X \\subseteq Y$ ile uyumludur (3/4). Elemanlar bağımsız olduğundan cevap $(3/4)^n$'dir!<br>\n    2) <strong>Tam olasılık formülü :</strong> $|Y| = i$ şartlandırması ile $\\sum_{i=0}^n \\binom{n}{i} \\frac{2^i}{2^n} \\frac{1}{2^n} = \\frac{(1+2)^n}{4^n} = (3/4)^n$.\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "\n<div class=\"theory-section\">\n  <h2>1. Espace Fondamental & Axiomes de Kolmogorov</h2>\n  <p>Une expérience aléatoire est modélisée par un espace probabilisé $(\\Omega, \\mathcal{F}, P)$ où :</p>\n  <ul>\n    <li>$\\Omega$ est l'ensemble fondamental (univers de tous les résultats possibles $\\omega$).</li>\n    <li>$\\mathcal{F}$ est une tribu d'événements (fermé par passage au complémentaire et union dénombrable).</li>\n    <li>$P : \\mathcal{F} \\to [0, 1]$ est la mesure de probabilité vérifiant les <strong>Axiomes de Kolmogorov</strong> :</li>\n  </ul>\n  <div class=\"academic-definition-box\">\n    <ol>\n      <li><strong>Axiome 1 (Positivité) :</strong> Pour tout événement $E$, $0 \\le P(E) \\le 1$.</li>\n      <li><strong>Axiome 2 (Normalisation) :</strong> $P(\\Omega) = 1$.</li>\n      <li><strong>Axiome 3 ($\\sigma$-additivité) :</strong> Si $(E_n)_{n \\ge 1}$ est une suite d'événements disjoints deux à deux ($E_i \\cap E_j = \\emptyset$), alors $P\\left(\\bigcup_{n=1}^\\infty E_n\\right) = \\sum_{n=1}^\\infty P(E_n)$.</li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>2. Algèbre des Événements & <span class=\"term-link\" onclick=\"openConceptModal('formule_poincare')\">Formule de Poincaré</span> (Inclusion-Exclusion)</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Propriétés Fondamentales Déduites</h4>\n    <ul>\n      <li>$P(\\emptyset) = 0$ et $P(E^c) = 1 - P(E)$.</li>\n      <li><strong>Monotonie :</strong> Si $E \\subseteq F$, alors $P(E) \\le P(F)$ et $P(F \\setminus E) = P(F) - P(E)$.</li>\n      <li><strong>Formule de Poincaré (2 événements) :</strong> $P(E \\cup F) = P(E) + P(F) - P(E \\cap F)$.</li>\n      <li><strong>Exactement un seul des deux :</strong> $P((E \\cap F^c) \\cup (E^c \\cap F)) = P(E) + P(F) - 2P(E \\cap F)$.</li>\n      <li><strong>Lois de De Morgan :</strong> $(E \\cup F)^c = E^c \\cap F^c$ et $(E \\cap F)^c = E^c \\cup F^c$.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>3. Sınav Mantığı : İki Bağımsız Kümenin Kapsanması P(X ⊆ Y) = (3/4)ⁿ</h2>\n  <div class=\"intuition-callout\">\n    <strong>💡 2024 DS Sınav Sorusu Mantığı :</strong><br>\n    $A = \\{1, \\dots, n\\}$ kümesinin $2^n$ alt kümesinden bağımsız ve eş olasılıkla $X$ ve $Y$ seçildiğinde, $X \\subseteq Y$ olayını incelemenin iki yolu vardır :<br>\n    1) <strong>Eleman bazlı <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">bağımsızlık</span> :</strong> Her $a \\in A$ elemanı için 4 olası durum vardır: $(a \\notin X, a \\notin Y), (a \\notin X, a \\in Y), (a \\in X, a \\in Y)$ ve $(a \\in X, a \\notin Y)$. İlk 3 durum $X \\subseteq Y$ ile uyumludur (3/4). Elemanlar bağımsız olduğundan cevap $(3/4)^n$'dir!<br>\n    2) <strong>Tam olasılık formülü :</strong> $|Y| = i$ şartlandırması ile $\\sum_{i=0}^n \\binom{n}{i} \\frac{2^i}{2^n} \\frac{1}{2^n} = \\frac{(1+2)^n}{4^n} = (3/4)^n$.\n  </div>\n</div>\n",
      "concepts": [
        "theoreme_bayes_totales",
        "independance_evenements",
        "formule_poincare"
      ],
      "exercises": [
        {
          "id": "olas_2024_ex2",
          "name": "Exercice 1 (2024 DS • Soru 2)",
          "subtitle": "Probabilité d'Inclusion : P(X ⊆ Y) = (3/4)ⁿ",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "theoreme_bayes_totales",
            "independance_evenements"
          ],
          "enonce": "Soit $A = \\{1, 2, \\dots, n\\}$. Soient $X$ et $Y$ deux parties de $A$ choisies de façon indépendante et telles que chaque partie de $A$ ait la même probabilité d'être choisie (y compris $\\emptyset$ et $A$ lui-même).<br><br>Montrer que :<br>$$P\\{X \\subset Y\\} = \\left(\\frac{3}{4}\\right)^n$$<br><em>Indication :</em> Soit $N(Y)$ le nombre d'éléments dans $Y$. Utiliser la formule des <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilités totales</span> :<br>$$P\\{X \\subseteq Y\\} = \\sum_{i=0}^n P\\{X \\subseteq Y \\mid N(Y) = i\\} P\\{N(Y) = i\\}$$",
          "hint": "Y kümesinin i elemanlı olma olasılığı Binom(n, 1/2) dir. Y sabitken X'in Y alt kümesi olma olasılığı 2^i / 2^n dir.",
          "steps": [
            {
              "title": "Étape 1 : Loi du cardinal N(Y)",
              "content": "Chaque sous-ensemble de $A$ a probabilité $1/2^n$. Pour un entier $i \\in \\{0, \\dots, n\\}$, il y a $\\binom{n}{i}$ sous-ensembles de taille $i$.<br>$$P\\{N(Y) = i\\} = \\binom{n}{i} \\frac{1}{2^n}$$"
            },
            {
              "title": "Étape 2 : Probabilité conditionnelle P(X ⊆ Y | N(Y) = i)",
              "content": "Sachant que $Y$ possède $i$ éléments, $Y$ possède exactement $2^i$ sous-ensembles.<br>Comme $X$ est choisi uniformément parmi les $2^n$ sous-ensembles de $A$ indépendamment de $Y$ :<br>$$P\\{X \\subseteq Y \\mid N(Y) = i\\} = \\frac{2^i}{2^n}$$"
            },
            {
              "title": "Étape 3 : Sommation par le binôme de Newton",
              "content": "Par la formule des <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilités totales</span> :<br>$$P\\{X \\subseteq Y\\} = \\sum_{i=0}^n \\frac{2^i}{2^n} \\cdot \\binom{n}{i} \\frac{1}{2^n} = \\frac{1}{4^n} \\sum_{i=0}^n \\binom{n}{i} 2^i$$Par la formule du binôme de Newton, $\\sum_{i=0}^n \\binom{n}{i} 2^i = (1 + 2)^n = 3^n$. D'où :<br>$$P\\{X \\subseteq Y\\} = \\frac{3^n}{4^n} = \\left(\\frac{3}{4}\\right)^n$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex4",
          "name": "Exercice 2 (2022 DS • Soru 4)",
          "subtitle": "Deux Dés : Somme 6 Sachant Résultats Différents",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "theoreme_bayes_totales"
          ],
          "enonce": "On jette deux dés parfaits.<br>Quelle est la probabilité que la somme soit 6, sachant que les deux résultats sont différents ?",
          "hint": "Koşullu olasılık tanımı: P(A | B) = |A ∩ B| / |B|. Paydada çift gelen (1,1)...(6,6) zarlar hariç 30 durum vardır.",
          "steps": [
            {
              "title": "Étape 1 : Dénombrement de l'événement conditionnant B",
              "content": "L'univers est $\\Omega = \\{1, \\dots, 6\\}^2$, de cardinal $36$.<br>Soit $B$ l'événement « les deux résultats sont différents » :<br>$$\\text{Card}(B) = 36 - 6 = 30$$"
            },
            {
              "title": "Étape 2 : Événement A et intersection A ∩ B",
              "content": "Soit $A$ l'événement « la somme vaut 6 » :<br>$$A = \\{(1,5), (2,4), (3,3), (4,2), (5,1)\\}$$<br>L'intersection $A \\cap B$ exclut le double $(3,3)$ :<br>$$A \\cap B = \\{(1,5), (2,4), (4,2), (5,1)\\} \\implies \\text{Card}(A \\cap B) = 4$$"
            },
            {
              "title": "Étape 3 : Calcul de la probabilité conditionnelle",
              "content": "$$P(A \\mid B) = \\frac{\\text{Card}(A \\cap B)}{\\text{Card}(B)} = \\frac{4}{30} = \\frac{2}{15}$$"
            }
          ]
        },
        {
          "id": "olas_slide_167",
          "name": "Exercice 3 (Slide 167 & 168)",
          "subtitle": "Deux Dés : Somme 5 avant Somme 7 & Théorème Général P(E)/(P(E)+P(F))",
          "tag": "Ders Slaytı Örneği (Slide 167)",
          "concepts": [
            "independance_evenements",
            "theoreme_bayes_totales"
          ],
          "enonce": "Une séquence d'épreuves indépendantes consiste à jeter plusieurs fois une paire de dés réguliers.<br><br>1. Quelle est la probabilité qu'on voie sortir une somme valant 5 avant qu'un 7 n'apparaisse ?<br>2. Démontrer le théorème général : si $E$ et $F$ sont deux événements s'excluant mutuellement lors d'une épreuve ($E \\cap F = \\emptyset$), la probabilité que $E$ survienne avant $F$ dans une suite d'épreuves indépendantes est $\\frac{P(E)}{P(E) + P(F)}$.",
          "hint": "5 gelme olasılığı 4/36, 7 gelme olasılığı 6/36 dır. İlk atışta ya 5 gelir, ya 7 gelir ya da ikisi de gelmez.",
          "steps": [
            {
              "title": "Étape 1 : Calcul direct par série géométrique",
              "content": "À chaque lancer : $P(5) = 4/36$, $P(7) = 6/36$, et $P(\\text{ni 5 ni 7}) = 1 - 10/36 = 26/36$.<br>Pour que 5 sorte avant 7, il faut $n - 1$ lancers neutres puis un 5 au $n$-ième :<br>$$P(\\text{5 avant 7}) = \\sum_{n=1}^\\infty \\left(\\frac{26}{36}\\right)^{n - 1} \\left(\\frac{4}{36}\\right) = \\frac{4/36}{1 - 26/36} = \\frac{4/36}{10/36} = \\frac{4}{10} = \\frac{2}{5}$$"
            },
            {
              "title": "Étape 2 : Preuve du théorème général par conditionnement",
              "content": "Soit $G$ l'événement « $E$ survient avant $F$ ». Conditionnons sur le premier essai :<br>• Si $E$ se réalise au 1er essai (proba $P(E)$), $G$ est réalisé : $P(G \\mid E) = 1$.<br>• Si $F$ se réalise au 1er essai (proba $P(F)$), $G$ est impossible : $P(G \\mid F) = 0$.<br>• Si ni $E$ ni $F$ ne se réalisent (proba $1 - P(E) - P(F)$), le jeu recommence à l'identique : $P(G \\mid (E \\cup F)^c) = P(G)$.<br><br>Par <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilités totales</span> :<br>$$P(G) = P(E) \\cdot 1 + P(F) \\cdot 0 + [1 - P(E) - P(F)] P(G)$$<br>$$P(G) [P(E) + P(F)] = P(E) \\implies P(G) = \\frac{P(E)}{P(E) + P(F)}$$"
            }
          ]
        },
        {
          "id": "olas_ch2_prob12",
          "name": "Exercice 4 (Ch2 Problèmes • Exercice 12)",
          "subtitle": "Probabilité qu'Exactement un des Deux Événements se Réalise",
          "tag": "Sheldon Ross Ch2 Problème",
          "concepts": [
            "formule_poincare"
          ],
          "enonce": "Montrer que la probabilité qu'exactement l'un des deux événements $E, F$ se réalise est égale à :<br>$$P(E) + P(F) - 2P(E \\cap F)$$",
          "hint": "Tam olarak birinin gerçekleşmesi (E ∩ F^c) ∪ (E^c ∩ F) demektir. Ayrık parçalanıştan yararlanın.",
          "steps": [
            {
              "title": "Étape 1 : Décomposition en événements disjoints",
              "content": "L'événement « exactement l'un des deux se réalise » est l'union disjointe :<br>$$G = (E \\cap F^c) \\cup (E^c \\cap F)$$Comme ces deux événements sont <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">incompatibles</span> :<br>$$P(G) = P(E \\cap F^c) + P(E^c \\cap F)$$"
            },
            {
              "title": "Étape 2 : Expression à l'aide de la différence",
              "content": "Puisque $E = (E \\cap F) \\cup (E \\cap F^c)$ avec des parties disjointes, on a :<br>$$P(E \\cap F^c) = P(E) - P(E \\cap F)$$De même, $P(E^c \\cap F) = P(F) - P(E \\cap F)$.<br>En additionnant :<br>$$P(G) = [P(E) - P(E \\cap F)] + [P(F) - P(E \\cap F)] = P(E) + P(F) - 2P(E \\cap F)$$"
            }
          ]
        }
      ]
    },
    "olasilik_mod3": {
      "id": "olasilik_mod3",
      "title": "Modül 3: Tam Olasılık, Bayes Teoremi & Bağımsızlık",
      "shortTitle": "3. Bayes & Bağımsızlık",
      "breadcrumb": "MAT206 > Modül 3",
      "theoryPages": [
        {
          "title": "Sayfa 1: Koşullu Olasılık & Çarpım Kuralı",
          "html": "\n<div class=\"theory-section\">\n  <h2>1. Probabilité Conditionnelle & Règle de Multiplication</h2>\n  <div class=\"academic-definition-box\">\n    <h4>Définition</h4>\n    <p>Pour tout événement $F$ tel que $P(F) > 0$, la <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilité conditionnelle</span> de $E$ sachant $F$ est :</p>\n    $$P(E \\mid F) = \\frac{P(E \\cap F)}{P(F)}$$\n    <p><strong>Règle de multiplication :</strong> $P(E_1 \\cap \\dots \\cap E_n) = P(E_1)P(E_2 \\mid E_1) \\cdots P(E_n \\mid E_1 \\cap \\dots \\cap E_{n-1})$.</p>\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 2: Tam Olasılık & Bayes Teoremi",
          "html": "\n<div class=\"theory-section\">\n  <h2>2. Formule des Probabilités Totales & <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">Théorème de Bayes</span></h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Système Complet d'Événements</h4>\n    <p>Une famille $(B_1, \\dots, B_n)$ est un système complet si les $B_i$ sont deux à deux disjoints ($B_i \\cap B_j = \\emptyset$) et $\\bigcup_{i=1}^n B_i = \\Omega$ avec $P(B_i) > 0$.</p>\n    <h4>Formule des Probabilités Totales</h4>\n    $$P(A) = \\sum_{i=1}^n P(A \\cap B_i) = \\sum_{i=1}^n P(A \\mid B_i) P(B_i)$$\n    <h4>Formule de Bayes (Inversion des Probabilités Conditionnelles)</h4>\n    $$P(B_k \\mid A) = \\frac{P(A \\mid B_k) P(B_k)}{P(A)} = \\frac{P(A \\mid B_k) P(B_k)}{\\sum_{i=1}^n P(A \\mid B_i) P(B_i)}$$\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 3: Bağımsızlık vs Ayrıklık & Güvenilirlik",
          "html": "\n<div class=\"theory-section\">\n  <h2>3. <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">Indépendance</span> vs Incompatibilité & Systèmes en Réseau</h2>\n  <div class=\"intuition-callout\">\n    <strong>⚠️ Sınavın En Ölümcül Tuzağı (İncompatibles vs Indépendants) :</strong><br>\n    • $E$ ve $F$ <strong>incompatibles (ayrık)</strong> ise: $E \\cap F = \\emptyset \\implies P(E \\cap F) = 0$.<br>\n    • $E$ ve $F$ <strong>indépendants (bağımsız)</strong> ise: $P(E \\cap F) = P(E)P(F)$.<br>\n    Pozitif olasılıklı iki olay <strong>ASLA aynı anda hem ayrık hem bağımsız olamaz</strong>! Çünkü $P(E \\cap F) = 0 \\neq P(E)P(F) > 0$.\n  </div>\n\n  <div class=\"academic-definition-box\">\n    <h4>Systèmes en Série et en Parallèle (Slide 166)</h4>\n    <ul>\n      <li><strong>Système en série :</strong> Fonctionne si <em>tous</em> les composants fonctionnent : $P = \\prod_{i=1}^n p_i$.</li>\n      <li><strong>Système en parallèle :</strong> Fonctionne si <em>au moins un</em> composant fonctionne : $P = 1 - \\prod_{i=1}^n (1 - p_i)$.</li>\n    </ul>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "\n<div class=\"theory-section\">\n  <h2>1. Probabilité Conditionnelle & Règle de Multiplication</h2>\n  <div class=\"academic-definition-box\">\n    <h4>Définition</h4>\n    <p>Pour tout événement $F$ tel que $P(F) > 0$, la <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilité conditionnelle</span> de $E$ sachant $F$ est :</p>\n    $$P(E \\mid F) = \\frac{P(E \\cap F)}{P(F)}$$\n    <p><strong>Règle de multiplication :</strong> $P(E_1 \\cap \\dots \\cap E_n) = P(E_1)P(E_2 \\mid E_1) \\cdots P(E_n \\mid E_1 \\cap \\dots \\cap E_{n-1})$.</p>\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>2. Formule des Probabilités Totales & Théorème de Bayes</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Système Complet d'Événements</h4>\n    <p>Une famille $(B_1, \\dots, B_n)$ est un système complet si les $B_i$ sont deux à deux disjoints ($B_i \\cap B_j = \\emptyset$) et $\\bigcup_{i=1}^n B_i = \\Omega$ avec $P(B_i) > 0$.</p>\n    <h4>Formule des Probabilités Totales</h4>\n    $$P(A) = \\sum_{i=1}^n P(A \\cap B_i) = \\sum_{i=1}^n P(A \\mid B_i) P(B_i)$$\n    <h4>Formule de Bayes (Inversion des Probabilités Conditionnelles)</h4>\n    $$P(B_k \\mid A) = \\frac{P(A \\mid B_k) P(B_k)}{P(A)} = \\frac{P(A \\mid B_k) P(B_k)}{\\sum_{i=1}^n P(A \\mid B_i) P(B_i)}$$\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>3. <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">Indépendance</span> vs Incompatibilité & Systèmes en Réseau</h2>\n  <div class=\"intuition-callout\">\n    <strong>⚠️ Sınavın En Ölümcül Tuzağı (İncompatibles vs Indépendants) :</strong><br>\n    • $E$ ve $F$ <strong>incompatibles (ayrık)</strong> ise: $E \\cap F = \\emptyset \\implies P(E \\cap F) = 0$.<br>\n    • $E$ ve $F$ <strong>indépendants (bağımsız)</strong> ise: $P(E \\cap F) = P(E)P(F)$.<br>\n    Pozitif olasılıklı iki olay <strong>ASLA aynı anda hem ayrık hem bağımsız olamaz</strong>! Çünkü $P(E \\cap F) = 0 \\neq P(E)P(F) > 0$.\n  </div>\n\n  <div class=\"academic-definition-box\">\n    <h4>Systèmes en Série et en Parallèle (Slide 166)</h4>\n    <ul>\n      <li><strong>Système en série :</strong> Fonctionne si <em>tous</em> les composants fonctionnent : $P = \\prod_{i=1}^n p_i$.</li>\n      <li><strong>Système en parallèle :</strong> Fonctionne si <em>au moins un</em> composant fonctionne : $P = 1 - \\prod_{i=1}^n (1 - p_i)$.</li>\n    </ul>\n  </div>\n</div>\n",
      "concepts": [
        "theoreme_bayes_totales",
        "independance_evenements"
      ],
      "exercises": [
        {
          "id": "olas_2024_ex4",
          "name": "Exercice 1 (2024 DS • Soru 4)",
          "subtitle": "Contrôle Qualité en Usine : Machine A vs Machine B",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "theoreme_bayes_totales"
          ],
          "enonce": "Une usine produit 60% de ses produits avec la machine A et 40% avec la machine B. Le taux de défectuosité est de 2% pour la machine A et de 5% pour la machine B.<br>Un produit sélectionné au hasard est trouvé défectueux. Quelle est la probabilité qu'il ait été fabriqué par la machine B ?",
          "hint": "A ve B makineleri tam olay sistemi oluşturur. P(D) = P(D|A)P(A) + P(D|B)P(B) hesaplayıp Bayes uygulayın.",
          "steps": [
            {
              "title": "Étape 1 : Système complet et probabilités données",
              "content": "Soient $A$ et $B$ les événements « fabriqué par machine A » et « par B » :<br>$$P(A) = 0.60, \\quad P(B) = 0.40$$Soit $D$ l'événement « produit défectueux » :<br>$$P(D \\mid A) = 0.02, \\quad P(D \\mid B) = 0.05$$"
            },
            {
              "title": "Étape 2 : Probabilité totale d'un produit défectueux",
              "content": "Par la formule des <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilités totales</span> :<br>$$P(D) = P(D \\mid A)P(A) + P(D \\mid B)P(B) = (0.02)(0.60) + (0.05)(0.40) = 0.012 + 0.020 = 0.032$$"
            },
            {
              "title": "Étape 3 : Application de la formule de Bayes",
              "content": "$$P(B \\mid D) = \\frac{P(D \\mid B)P(B)}{P(D)} = \\frac{0.020}{0.032} = \\frac{20}{32} = \\frac{5}{8} = 0.625 \\quad (62.5\\%)$$La probabilité cherchée est 62.5%."
            }
          ]
        },
        {
          "id": "olas_2022_ex7",
          "name": "Exercice 2 (2022 DS • Soru 7)",
          "subtitle": "Dépistage du Cancer par IA : Fiabilité & Prévalence",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "theoreme_bayes_totales"
          ],
          "enonce": "On suppose qu'une Intelligence Artificielle de détection du cancer du poumon a une fiabilité de 99% aussi bien pour ceux qui portent que ceux qui n'ont pas cette maladie ($P(T \\mid M) = 0.99$ et $P(T^c \\mid M^c) = 0.99$).<br>Dans la population, 0.01% des gens ont ce cancer.<br>Quelle est la probabilité qu'une personne ait le cancer, sachant que son test l'indique positif ?",
          "hint": "Hastalık prevalansı P(M) = 0.0001 çok düşüktür. Yalancı pozitifler hasta olanlardan kat kat fazla çıkacaktır.",
          "steps": [
            {
              "title": "Étape 1 : Modélisation des probabilités",
              "content": "Soit $M$ l'événement « avoir le cancer » : $P(M) = 0.01\\% = 0.0001$, donc $P(M^c) = 0.9999$.<br>Soit $T$ l'événement « test positif » :<br>$$P(T \\mid M) = 0.99, \\quad P(T \\mid M^c) = 1 - 0.99 = 0.01$$"
            },
            {
              "title": "Étape 2 : Probabilité totale d'un test positif",
              "content": "$$P(T) = P(T \\mid M)P(M) + P(T \\mid M^c)P(M^c) = (0.99)(0.0001) + (0.01)(0.9999) = 0.000099 + 0.009999 = 0.010098$$"
            },
            {
              "title": "Étape 3 : Formule de Bayes",
              "content": "$$P(M \\mid T) = \\frac{P(T \\mid M)P(M)}{P(T)} = \\frac{0.000099}{0.010098} = \\frac{99}{10098} \\approx 0.0098 \\quad (\\approx 0.98\\%)$$Même avec un test fiable à 99%, la rareté de la maladie fait que seulement 0.98% des personnes testées positives sont réellement malades."
            }
          ]
        },
        {
          "id": "olas_slide_166",
          "name": "Exercice 3 (Slide 166)",
          "subtitle": "Fiabilité d'un Système à n Composants en Parallèle",
          "tag": "Ders Slaytı Örneği (Slide 166)",
          "concepts": [
            "independance_evenements"
          ],
          "enonce": "Un système à $n$ composants est appelé système en parallèle s'il fonctionne dès qu'au moins l'un de ces composants fonctionne.<br>Si le $i$-ème composant fonctionne indépendamment de tous les autres avec probabilité $p_i$ ($i = 1, \\dots, n$), quelle est la probabilité de fonctionnement du système ?",
          "hint": "En az bir bileşenin çalışması olayının tümleyeni, hiçbir bileşenin çalışmamasıdır.",
          "steps": [
            {
              "title": "Étape 1 : Passage à l'événement complémentaire",
              "content": "Soit $A_i$ l'événement « le composant $i$ fonctionne » ($P(A_i) = p_i$).<br>Le système fonctionne dès qu'au moins un composant fonctionne : $\\bigcup_{i=1}^n A_i$.<br>Passons au complémentaire : le système tombe en panne si et seulement si <strong>aucun</strong> composant ne fonctionne :<br>$$\\left(\\bigcup_{i=1}^n A_i\\right)^c = \\bigcap_{i=1}^n A_i^c$$"
            },
            {
              "title": "Étape 2 : Indépendance et produit",
              "content": "Puisque les composants fonctionnent de manière indépendante, les événements complémentaires $A_i^c$ sont <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">mutuellement indépendants</span> avec $P(A_i^c) = 1 - p_i$ :<br>$$P\\left(\\bigcap_{i=1}^n A_i^c\\right) = \\prod_{i=1}^n P(A_i^c) = \\prod_{i=1}^n (1 - p_i)$$"
            },
            {
              "title": "Étape 3 : Probabilité de fonctionnement",
              "content": "$$P(\\text{système fonctionne}) = 1 - \\prod_{i=1}^n (1 - p_i)$$Si tous les $p_i = p$, la formule devient $1 - (1 - p)^n$."
            }
          ]
        },
        {
          "id": "olas_bernstein",
          "name": "Exercice 4 (Classique Sheldon Ross)",
          "subtitle": "Contre-exemple de Bernstein : Indépendance Deux à Deux vs Mutuelle",
          "tag": "Sheldon Ross Temel Karşıt Örnek",
          "concepts": [
            "independance_evenements"
          ],
          "enonce": "On jette deux pièces régulières. On définit les événements :<br>• $A$ : « la première pièce donne pile »<br>• $B$ : « la deuxième pièce donne pile »<br>• $C$ : « les deux pièces donnent le même résultat »<br><br>Montrer que $A, B, C$ sont deux à deux indépendants mais ne sont pas <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">mutuellement indépendants</span>.",
          "hint": "P(A ∩ B ∩ C) değerini P(A)P(B)P(C) ile karşılaştırın.",
          "steps": [
            {
              "title": "Étape 1 : Probabilités individuelles",
              "content": "L'univers est $\\Omega = \\{(P,P), (P,F), (F,P), (F,F)\\}$ avec <span class=\"term-link\" onclick=\"openConceptModal('denombrement_tirages')\">équiprobabilité</span> $1/4$.<br>• $A = \\{(P,P), (P,F)\\} \\implies P(A) = 2/4 = 1/2$.<br>• $B = \\{(P,P), (F,P)\\} \\implies P(B) = 2/4 = 1/2$.<br>• $C = \\{(P,P), (F,F)\\} \\implies P(C) = 2/4 = 1/2$."
            },
            {
              "title": "Étape 2 : Indépendance deux à deux",
              "content": "• $A \\cap B = \\{(P,P)\\} \\implies P(A \\cap B) = 1/4 = P(A)P(B)$.<br>• $A \\cap C = \\{(P,P)\\} \\implies P(A \\cap C) = 1/4 = P(A)P(C)$.<br>• $B \\cap C = \\{(P,P)\\} \\implies P(B \\cap C) = 1/4 = P(B)P(C)$.<br>Les trois événements sont donc bien deux à deux indépendants."
            },
            {
              "title": "Étape 3 : Non-indépendance mutuelle",
              "content": "$$A \\cap B \\cap C = \\{(P,P)\\} \\implies P(A \\cap B \\cap C) = \\frac{1}{4}$$Or :<br>$$P(A)P(B)P(C) = \\frac{1}{2} \\times \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{8} \\neq \\frac{1}{4}$$L'<span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">indépendance mutuelle</span> n'est pas vérifiée. L'indépendance deux à deux n'implique pas l'indépendance mutuelle !"
            }
          ]
        }
      ]
    },
    "olasilik_mod4": {
      "id": "olasilik_mod4",
      "title": "Modül 4: Bağımsız Denemeler, Pascal & Ruine du Joueur",
      "shortTitle": "4. Pascal & Ruine du Joueur",
      "breadcrumb": "MAT206 > Modül 4",
      "theoryPages": [
        {
          "title": "Sayfa 1: Sonsuz Deneyler & Silindirler",
          "html": "\n<div class=\"theory-section\">\n  <h2>1. Séquences d'Épreuves Indépendantes & Cylindres</h2>\n  <p>Une suite infinie de lancers d'une pièce est modélisée par l'espace produit $S = \\{0, 1\\}^\\mathbb{N} = \\{(x_1, x_2, \\dots) \\mid x_i \\in \\{0, 1\\}\\}$ (2022 DS Soru 1).</p>\n  <div class=\"academic-definition-box\">\n    <h4>Cylindres Élémentaires</h4>\n    <p>Un ensemble cylindrique $C(a_1, \\dots, a_n)$ fixe les $n$ premiers résultats et laisse libres tous les suivants :</p>\n    $$P(C(a_1, \\dots, a_n)) = p^{\\sum a_i} (1 - p)^{n - \\sum a_i}$$\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 2: Pascal'ın Puan Problemi",
          "html": "\n<div class=\"theory-section\">\n  <h2>2. Le Problème des Points de Pascal (Slide 169)</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Problème des Points</h4>\n    <p>Deux joueurs A et B disputent une série de parties indépendantes ($p$ et $1-p$). Le joueur A a besoin de $n$ victoires de plus pour remporter le prix, et B en a besoin de $m$.</p>\n    <p><strong>Solution de Pascal :</strong> A l'emporte sans que B atteigne $m$ victoires si et seulement si A obtient <em>au moins $n$ succès</em> au cours des $n + m - 1$ premières parties :</p>\n    $$P = \\sum_{k=n}^{n + m - 1} \\binom{n + m - 1}{k} p^k (1 - p)^{n + m - 1 - k}$$\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 3: Kumarbazın İflası (Ruine du Joueur)",
          "html": "\n<div class=\"theory-section\">\n  <h2>3. La Ruine du Joueur (Slides 170-174) & Récurrences</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Équation Fondamentale de la Ruine du Joueur</h4>\n    <p>A a $i$ unités, B a $N - i$ unités. À chaque étape A gagne $+1$ (proba $p$) ou $-1$ (proba $q = 1-p$).</p>\n    $$P_i = p P_{i+1} + q P_{i-1}, \\quad P_0 = 0, \\quad P_N = 1$$\n    $$P_i = \\begin{cases} \\frac{1 - (q/p)^i}{1 - (q/p)^N} & \\text{si } p \\neq 1/2 \\\\ \\frac{i}{N} & \\text{si } p = 1/2 \\end{cases}$$\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "\n<div class=\"theory-section\">\n  <h2>1. Séquences d'Épreuves Indépendantes & Cylindres</h2>\n  <p>Une suite infinie de lancers d'une pièce est modélisée par l'espace produit $S = \\{0, 1\\}^\\mathbb{N} = \\{(x_1, x_2, \\dots) \\mid x_i \\in \\{0, 1\\}\\}$ (2022 DS Soru 1).</p>\n  <div class=\"academic-definition-box\">\n    <h4>Cylindres Élémentaires</h4>\n    <p>Un ensemble cylindrique $C(a_1, \\dots, a_n)$ fixe les $n$ premiers résultats et laisse libres tous les suivants :</p>\n    $$P(C(a_1, \\dots, a_n)) = p^{\\sum a_i} (1 - p)^{n - \\sum a_i}$$\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>2. Le Problème des Points de Pascal (Slide 169)</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Problème des Points</h4>\n    <p>Deux joueurs A et B disputent une série de parties indépendantes ($p$ et $1-p$). Le joueur A a besoin de $n$ victoires de plus pour remporter le prix, et B en a besoin de $m$.</p>\n    <p><strong>Solution de Pascal :</strong> A l'emporte sans que B atteigne $m$ victoires si et seulement si A obtient <em>au moins $n$ succès</em> au cours des $n + m - 1$ premières parties :</p>\n    $$P = \\sum_{k=n}^{n + m - 1} \\binom{n + m - 1}{k} p^k (1 - p)^{n + m - 1 - k}$$\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>3. La Ruine du Joueur (Slides 170-174) & Récurrences</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Équation Fondamentale de la Ruine du Joueur</h4>\n    <p>A a $i$ unités, B a $N - i$ unités. À chaque étape A gagne $+1$ (proba $p$) ou $-1$ (proba $q = 1-p$).</p>\n    $$P_i = p P_{i+1} + q P_{i-1}, \\quad P_0 = 0, \\quad P_N = 1$$\n    $$P_i = \\begin{cases} \\frac{1 - (q/p)^i}{1 - (q/p)^N} & \\text{si } p \\neq 1/2 \\\\ \\frac{i}{N} & \\text{si } p = 1/2 \\end{cases}$$\n  </div>\n</div>\n",
      "concepts": [
        "loi_binomiale_poisson",
        "independance_evenements",
        "theoreme_bayes_totales"
      ],
      "exercises": [
        {
          "id": "olas_2022_ex3",
          "name": "Exercice 1 (2022 DS • Soru 3)",
          "subtitle": "Épreuves de Bernoulli : Nombre Pair de Succès & Formule Explicite",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "loi_binomiale_poisson",
            "independance_evenements"
          ],
          "enonce": "On appelle <span class=\"term-link\" onclick=\"openConceptModal('loi_binomiale_poisson')\">épreuves de Bernoulli</span> des épreuves indépendantes ayant $p$ pour probabilité de succès et $1 - p$ pour probabilité d'échec.<br>Soit $P_n$ la probabilité que $n$ épreuves de Bernoulli successives débouchent sur un nombre pair de succès (où 0 est considéré pair).<br><br>1. Montrer que :<br>$$P_n = p(1 - P_{n-1}) + (1 - p)P_{n-1}$$<br>2. Utiliser ce résultat pour démontrer par récurrence que :<br>$$P_n = \\frac{1 + (1 - 2p)^n}{2}$$",
          "hint": "Son yapılan n-inci denemenin sonucuna göre koşullandırma yapın.",
          "steps": [
            {
              "title": "Étape 1 : Récurrence par probabilités totales",
              "content": "Conditionnons sur le résultat du $n$-ième essai :<br>• Si c'est un succès (proba $p$) : il fallait un nombre impair de succès aux $n - 1$ premiers essais, probabilité $1 - P_{n-1}$.<br>• Si c'est un échec (proba $1 - p$) : il fallait un nombre pair de succès aux $n - 1$ premiers essais, probabilité $P_{n-1}$.<br>$$P_n = p(1 - P_{n-1}) + (1 - p)P_{n-1} = p + (1 - 2p)P_{n-1}$$"
            },
            {
              "title": "Étape 2 : Preuve par récurrence",
              "content": "• Initialisation ($n = 0$) : 0 succès est pair, $P_0 = 1$. Formule : $\\frac{1 + (1-2p)^0}{2} = 1$. Vrai.<br>• Hérédité : Supposons $P_{n-1} = \\frac{1 + (1-2p)^{n-1}}{2}$. Alors :<br>$$P_n = p + (1 - 2p) \\left[\\frac{1 + (1 - 2p)^{n-1}}{2}\\right] = \\frac{2p + (1 - 2p) + (1 - 2p)^n}{2} = \\frac{1 + (1 - 2p)^n}{2}$$"
            }
          ]
        },
        {
          "id": "olas_2024_ex7",
          "name": "Exercice 2 (2024 DS • Soru 7)",
          "subtitle": "Joueur A (n+1 pièces) vs Joueur B (n pièces) : P(A > B) = 1/2",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "independance_evenements",
            "theoreme_bayes_totales"
          ],
          "enonce": "Si le joueur A lance $n + 1$ pièces équitables et que le joueur B lance $n$ pièces équitables, montrez que la probabilité que A obtienne plus de faces que B est $\\frac{1}{2}$.<br><br><em>Indication :</em> Conditionner en fonction du joueur qui a obtenu le plus de faces après que chacun a lancé $n$ pièces (trois possibilités).",
          "hint": "İlk n atışta P(A_n > B_n) = P(A_n < B_n) = p1 ve P(A_n = B_n) = p0 dir. 2p1 + p0 = 1.",
          "steps": [
            {
              "title": "Étape 1 : Partition après les n premiers lancers",
              "content": "Soient $A_n$ et $B_n$ le nombre de faces de A et B sur leurs $n$ premiers lancers. Par symétrie :<br>$$P(A_n > B_n) = P(A_n < B_n) = p_1, \\quad P(A_n = B_n) = p_0 \\implies 2p_1 + p_0 = 1$$"
            },
            {
              "title": "Étape 2 : Impact du (n+1)-ième lancer de A",
              "content": "Soit $X \\in \\{0, 1\\}$ le résultat de la $(n+1)$-ième pièce de A ($P(X=1) = 1/2$) :<br>• Si $A_n > B_n$ : A a déjà strictement plus de faces, $P(A_{n+1} > B_n) = 1$.<br>• Si $A_n < B_n$ : $B_n - A_n \\ge 1$, même avec $X=1$ A ne peut pas dépasser B, $P(A_{n+1} > B_n) = 0$.<br>• Si $A_n = B_n$ : A gagne si et seulement si $X = 1$, probabilité $1/2$."
            },
            {
              "title": "Étape 3 : Conclusion",
              "content": "$$P(A_{n+1} > B_n) = 1 \\cdot p_1 + 0 \\cdot p_1 + \\frac{1}{2} \\cdot p_0 = p_1 + \\frac{1}{2}p_0 = \\frac{2p_1 + p_0}{2} = \\frac{1}{2}$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex2",
          "name": "Exercice 3 (2022 DS • Soru 2)",
          "subtitle": "Jeu Alterné de Pièces : P(n,m) = p P(n-1,m) + (1-p)(1-P(m,n))",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "theoreme_bayes_totales",
            "independance_evenements"
          ],
          "enonce": "Une pièce tombe sur pile avec probabilité $p$. Un joueur A commence à la lancer et poursuit jusqu'à la première apparition de pile. À ce moment B la lance jusqu'à ce que pile apparaisse pour la première fois, ce qui fait repasser la pièce à A et ainsi de suite.<br>On note par $P_{n,m}$ la probabilité que A ait pu accumuler un total de $n$ piles avant que B en ait eu $m$.<br><br>Montrer que :<br>$$P_{n,m} = p P_{n-1,m} + (1 - p)(1 - P_{m,n})$$",
          "hint": "A oyuncusunun ilk atışının sonucuna göre koşullandırın.",
          "steps": [
            {
              "title": "Étape 1 : Conditionnement sur le premier jet",
              "content": "Au tout premier jet de A :<br>• Avec probabilité $p$, A obtient pile tout de suite. A a 1 pile, il lui en manque $n - 1$, et le tour passe à B.<br>• Avec probabilité $1 - p$, A obtient face. A n'a pas encore de pile, mais le jeu se poursuit selon la symétrie des tours alternés."
            },
            {
              "title": "Étape 2 : Établissement de la relation",
              "content": "Par la formule des <span class=\"term-link\" onclick=\"openConceptModal('theoreme_bayes_totales')\">probabilités totales</span> :<br>$$P_{n,m} = p P_{n-1,m} + (1 - p)(1 - P_{m,n})$$"
            }
          ]
        },
        {
          "id": "olas_slide_170",
          "name": "Exercice 4 (Slide 170-174)",
          "subtitle": "La Ruine du Joueur : Équation aux Différences et Résolution Complète",
          "tag": "Ders Slaytı Master Problemi",
          "concepts": [
            "theoreme_bayes_totales",
            "independance_evenements"
          ],
          "enonce": "Un joueur A possède $i$ unités et joue contre un adversaire B qui possède $N - i$ unités.<br>À chaque manche, A gagne 1 unité avec probabilité $p$ et perd 1 unité avec probabilité $q = 1 - p$.<br><br>1. Posons $P_i$ la probabilité que A ruine B en partant avec $i$ unités. Montrer que :<br>$$P_i = p P_{i+1} + q P_{i-1}, \\quad \\text{avec } P_0 = 0 \\text{ et } P_N = 1$$<br>2. Résoudre cette équation pour $p = 1/2$ et $p \\neq 1/2$.",
          "hint": "İlk oyunun sonucuna göre koşullandırıp (p+q)P_i = p P_{i+1} + q P_{i-1} yazın.",
          "steps": [
            {
              "title": "Étape 1 : Récurrence",
              "content": "Conditionnons sur le premier jeu : $P_i = p P_{i+1} + q P_{i-1}$.<br>Comme $p + q = 1$ : $p(P_{i+1} - P_i) = q(P_i - P_{i-1}) \\implies P_{i+1} - P_i = \\frac{q}{p}(P_i - P_{i-1})$."
            },
            {
              "title": "Étape 2 : Sommation géométrique",
              "content": "Posons $r = q/p$. Par télescopage : $P_{i+1} - P_i = r^i P_1$, d'où $P_i = P_1 \\sum_{k=0}^{i-1} r^k$."
            },
            {
              "title": "Étape 3 : Résolution",
              "content": "• Si $p = 1/2$ ($r = 1$) : $P_i = i P_1$. Avec $P_N = 1$, on a $P_i = \\frac{i}{N}$.<br>• Si $p \\neq 1/2$ ($r \\neq 1$) : $P_i = P_1 \\frac{1 - r^i}{1 - r}$. Avec $P_N = 1$, on a :<br>$$P_i = \\frac{1 - (q/p)^i}{1 - (q/p)^N}$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex1",
          "name": "Exercice 5 (2022 DS • Soru 1)",
          "subtitle": "Expérience Infinie {0,1}^ℕ, Cylindres C(a₁,...,aₙ) & Lois Discrètes",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "independance_evenements"
          ],
          "enonce": "On lance une pièce de monnaie indéfiniment. Soit $S := \\{(x_1, x_2, \\dots) \\mid x_i \\in \\{0, 1\\}\\}$ avec probabilité $p$ pour pile (1) et $1 - p$ pour face (0).<br><br>(1) Calculer $P(C(a_1, \\dots, a_n))$ où $C(a_1, \\dots, a_n) := \\{(x_1, x_2, \\dots) \\in S \\mid x_1 = a_1, \\dots, x_n = a_n\\}$.<br>(2) Soient $A := C(0, 0, 0)$ et $B := C(1, 1, 1)$. Trouver $A \\cap B$, $A \\cup B$, et déterminer si $A$ et $B$ sont indépendants.<br>(3) Décrire deux variables aléatoires discrètes pour cette expérience et déterminer leurs lois.",
          "hint": "Cylindre ilk n adımın sabit olduğu sonsuz diziler kümesidir. Ayrık olaylar bağımsız olamaz.",
          "steps": [
            {
              "title": "Étape 1 : Probabilité du cylindre",
              "content": "Par <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">indépendance</span> des lancers :<br>$$P(C(a_1, \\dots, a_n)) = \\prod_{i=1}^n p^{a_i}(1 - p)^{1 - a_i} = p^{\\sum a_i} (1 - p)^{n - \\sum a_i}$$"
            },
            {
              "title": "Étape 2 : A et B",
              "content": "• $A \\cap B = \\emptyset \\implies P(A \\cap B) = 0$.<br>• $P(A \\cup B) = P(A) + P(B) = (1 - p)^3 + p^3$.<br>• <span class=\"term-link\" onclick=\"openConceptModal('independance_evenements')\">Indépendance</span> : $P(A \\cap B) = 0 \\neq P(A)P(B) = (1-p)^3 p^3 > 0$, donc $A$ et $B$ ne sont <strong>pas indépendants</strong>."
            },
            {
              "title": "Étape 3 : Deux variables et leurs lois",
              "content": "1. $X$ = rang du premier pile $\\implies$ <span class=\"term-link\" onclick=\"openConceptModal('loi_binomiale_poisson')\">Loi géométrique</span> $\\mathcal{G}(p)$, $P(X = k) = (1 - p)^{k - 1} p$.<br>2. $Y$ = nombre de piles parmi les $m$ premiers lancers $\\implies$ Loi binomiale $\\mathcal{B}(m, p)$, $P(Y = k) = \\binom{m}{k} p^k (1 - p)^{m - k}$."
            }
          ]
        }
      ]
    },
    "olasilik_mod5": {
      "id": "olasilik_mod5",
      "title": "Modül 5: Rastgele Değişkenler, Dağılım Fonksiyonları & Sınav Arşivi",
      "shortTitle": "5. Değişkenler & Sınav Arşivi",
      "breadcrumb": "MAT206 > Modül 5",
      "theoryPages": [
        {
          "title": "Sayfa 1: Rastgele Değişken & Dağılım Fonksiyonu",
          "html": "\n<div class=\"theory-section\">\n  <h2>1. Variables Aléatoires & <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">Fonction de Répartition</span></h2>\n  <p>Une variable aléatoire réelle $X : \\Omega \\to \\mathbb{R}$ est caractérisée par sa fonction de répartition $F_X(t) = P(X \\le t)$.</p>\n  <div class=\"academic-definition-box\">\n    <h4>Propriétés de F_X</h4>\n    <ul>\n      <li>$F$ est croissante et continue à droite.</li>\n      <li>$\\lim_{t \\to -\\infty} F(t) = 0$ et $\\lim_{t \\to +\\infty} F(t) = 1$.</li>\n      <li>$P(a < X \\le b) = F(b) - F(a)$.</li>\n    </ul>\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 2: Kesikli vs Sürekli Değişkenler",
          "html": "\n<div class=\"theory-section\">\n  <h2>2. Variables Discrètes vs Variables Continues</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Variables Discrètes (Sauts de F)</h4>\n    <p>L'ensemble des valeurs est dénombrable. $F$ est en escalier. La probabilité ponctuelle est la hauteur du saut :</p>\n    $$P(X = k) = F(k) - F(k^-)$$\n    <h4>Variables Continues (Densité f)</h4>\n    <p>Il existe $f \\ge 0$ telle que $F(x) = \\int_{-\\infty}^x f(t)\\,dt$. Alors $f(x) = F'(x)$ presque partout et $P(X = a) = 0$ pour tout point $a$.</p>\n  </div>\n</div>\n"
        },
        {
          "title": "Sayfa 3: Değişken Dönüşümleri & Gauss Dağılımı",
          "html": "\n<div class=\"theory-section\">\n  <h2>3. Changement de Variables & Loi Normale</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Formules de Changement de Variables</h4>\n    <ul>\n      <li>$Y = aX + b$ avec $a > 0$ : $F_Y(y) = F_X\\left(\\frac{y - b}{a}\\right)$.</li>\n      <li>$Y = -X$ (pour $X$ continue) : $F_Y(y) = 1 - F_X(-y)$.</li>\n      <li><strong>Loi Normale $\\mathcal{N}(\\mu, \\sigma^2)$ :</strong> $f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)$.</li>\n    </ul>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "\n<div class=\"theory-section\">\n  <h2>1. Variables Aléatoires & <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">Fonction de Répartition</span></h2>\n  <p>Une variable aléatoire réelle $X : \\Omega \\to \\mathbb{R}$ est caractérisée par sa fonction de répartition $F_X(t) = P(X \\le t)$.</p>\n  <div class=\"academic-definition-box\">\n    <h4>Propriétés de F_X</h4>\n    <ul>\n      <li>$F$ est croissante et continue à droite.</li>\n      <li>$\\lim_{t \\to -\\infty} F(t) = 0$ et $\\lim_{t \\to +\\infty} F(t) = 1$.</li>\n      <li>$P(a < X \\le b) = F(b) - F(a)$.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>2. Variables Discrètes vs Variables Continues</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Variables Discrètes (Sauts de F)</h4>\n    <p>L'ensemble des valeurs est dénombrable. $F$ est en escalier. La probabilité ponctuelle est la hauteur du saut :</p>\n    $$P(X = k) = F(k) - F(k^-)$$\n    <h4>Variables Continues (Densité f)</h4>\n    <p>Il existe $f \\ge 0$ telle que $F(x) = \\int_{-\\infty}^x f(t)\\,dt$. Alors $f(x) = F'(x)$ presque partout et $P(X = a) = 0$ pour tout point $a$.</p>\n  </div>\n</div>\n\n<div class=\"theory-section\">\n  <h2>3. Changement de Variables & Loi Normale</h2>\n  <div class=\"academic-theorem-card\">\n    <h4>Formules de Changement de Variables</h4>\n    <ul>\n      <li>$Y = aX + b$ avec $a > 0$ : $F_Y(y) = F_X\\left(\\frac{y - b}{a}\\right)$.</li>\n      <li>$Y = -X$ (pour $X$ continue) : $F_Y(y) = 1 - F_X(-y)$.</li>\n      <li><strong>Loi Normale $\\mathcal{N}(\\mu, \\sigma^2)$ :</strong> $f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)$.</li>\n    </ul>\n  </div>\n</div>\n",
      "concepts": [
        "variables_densite_exponentielle",
        "theoreme_central_limite"
      ],
      "exercises": [
        {
          "id": "olas_2024_ex1",
          "name": "Exercice 1 (2024 DS • Soru 1)",
          "subtitle": "Espace S = A × A, Fonction de Probabilité & Variables Non-Triviales",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "variables_densite_exponentielle"
          ],
          "enonce": "Soit $A := \\{1, 2, \\dots, n\\}$ un ensemble fini à $n$ éléments. Soit $S := A \\times A$.<br><br>(1) Imposer sur $S$ une fonction de probabilité $P$ que vous trouvez intéressante.<br>(2) Définir deux variables aléatoires $X, Y$ non-triviales sur $S$ (non-triviale veut dire non-constante et n'est pas de Bernoulli).<br>(3) Décrire la loi de probabilité de $X$ ainsi que la <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">fonction de répartition</span> de $X$.",
          "hint": "Eş olasılık P({(i,j)}) = 1/n² seçip X(i,j) = max(i,j) tanımlayın.",
          "steps": [
            {
              "title": "Étape 1 : Choix de la probabilité uniforme",
              "content": "$\\text{Card}(S) = n^2$. Définissons l'<span class=\"term-link\" onclick=\"openConceptModal('denombrement_tirages')\">équiprobabilité</span> : $\\forall (i, j) \\in S,\\; P(\\{(i, j)\\}) = \\frac{1}{n^2}$."
            },
            {
              "title": "Étape 2 : Définition des variables",
              "content": "• $X(i, j) = \\max(i, j)$ à valeurs dans $\\{1, \\dots, n\\}$.<br>• $Y(i, j) = i + j$ à valeurs dans $\\{2, \\dots, 2n\\}$."
            },
            {
              "title": "Étape 3 : Fonction de répartition et loi de X",
              "content": "$$P(X \\le k) = P(\\max(i, j) \\le k) = P(i \\le k, j \\le k) = \\frac{k^2}{n^2}$$La loi est donnée par les différences :<br>$$P(X = k) = F_X(k) - F_X(k - 1) = \\frac{k^2 - (k - 1)^2}{n^2} = \\frac{2k - 1}{n^2}$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex8",
          "name": "Exercice 2 (2022 DS • Soru 8)",
          "subtitle": "Fonction de Répartition de 2X + 3",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "variables_densite_exponentielle"
          ],
          "enonce": "Soit $F$ la <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">fonction de répartition</span> de $X$. Quelle est la fonction de répartition de la variable aléatoire $Y = 2X + 3$ ?",
          "hint": "F_Y(y) = P(Y <= y) tanımından yola çıkarak eşitsizliği X'e göre çözün.",
          "steps": [
            {
              "title": "Étape 1 : Calcul direct",
              "content": "$$F_Y(y) = P(2X + 3 \\le y) = P\\left(X \\le \\frac{y - 3}{2}\\right) = F\\left(\\frac{y - 3}{2}\\right)$$"
            }
          ]
        },
        {
          "id": "olas_2024_ex6",
          "name": "Exercice 3 (2024 DS • Soru 6)",
          "subtitle": "Fonction de Répartition de Y = -X pour une Variable Continue",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "variables_densite_exponentielle"
          ],
          "enonce": "Soit $X$ une variable aléatoire continue ayant une <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">fonction de répartition</span> $F$. On définit la variable aléatoire $Y$ par $Y := -X$. Trouver la fonction de répartition de $Y$ en termes de $F$.",
          "hint": "Eksi ile çarpınca eşitsizlik yön değiştirir: P(-X <= y) = P(X >= -y) = 1 - P(X < -y). Sürekli değişkende P(X = -y) = 0 dır.",
          "steps": [
            {
              "title": "Étape 1 : Calcul",
              "content": "$$F_Y(y) = P(-X \\le y) = P(X \\ge -y) = 1 - P(X < -y)$$Comme $X$ est <strong>continue</strong>, $P(X = -y) = 0$, donc :<br>$$F_Y(y) = 1 - F(-y)$$"
            }
          ]
        },
        {
          "id": "olas_2022_ex9",
          "name": "Exercice 4 (2022 DS • Soru 9)",
          "subtitle": "Loi d'une Variable Discrète à partir d'une Fonction de Répartition en Escalier",
          "tag": "2022 DS Sınav Sorusu",
          "concepts": [
            "variables_densite_exponentielle"
          ],
          "enonce": "La <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">fonction de répartition</span> d'une variable $X$ est :<br>$$F(b) = \\begin{cases} 0 & b < 0 \\\\ 1/2 & 0 \\le b < 1 \\\\ 2/3 & 1 \\le b < 2 \\\\ 3/4 & 2 \\le b < 3 \\\\ \\dots & \\dots \\\\ n/(n + 1) & n - 1 \\le b < n \\\\ \\dots & \\dots \\end{cases}$$<br>Déterminer la loi de $X$.",
          "hint": "P(X = k) = F(k) - F(k⁻) sıçrama yükseklikleridir.",
          "steps": [
            {
              "title": "Étape 1 : Calcul des probabilités ponctuelles",
              "content": "• Pour $k = 0$ : $P(X = 0) = F(0) - F(0^-) = 1/2 - 0 = 1/2$.<br>• Pour $k \\ge 1$ :<br>$$P(X = k) = \\frac{k + 1}{k + 2} - \\frac{k}{k + 1} = \\frac{(k + 1)^2 - k(k + 2)}{(k + 1)(k + 2)} = \\frac{1}{(k + 1)(k + 2)}$$"
            },
            {
              "title": "Étape 2 : Vérification",
              "content": "$$\\sum_{k=0}^\\infty P(X = k) = \\frac{1}{2} + \\sum_{k=1}^\\infty \\left(\\frac{1}{k + 1} - \\frac{1}{k + 2}\\right) = \\frac{1}{2} + \\frac{1}{2} = 1$$"
            }
          ]
        },
        {
          "id": "olas_2024_ex8",
          "name": "Exercice 5 (2024 DS • Soru 8)",
          "subtitle": "Densité Continue f(x) = 2x sur [0,1], Probabilité d'Intervalle & F(x)",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "variables_densite_exponentielle"
          ],
          "enonce": "Soit $X$ une variable aléatoire avec la densité suivante :<br>$$f(x) = \\begin{cases} 2x, & 0 \\le x \\le 1 \\\\ 0, & \\text{sinon} \\end{cases}$$<br>a) Vérifier que $f$ est une densité valide.<br>b) Trouver $P\\{0.25 \\le X \\le 0.75\\}$.<br>c) Décrire la <span class=\"term-link\" onclick=\"openConceptModal('variables_densite_exponentielle')\">fonction de répartition</span> de $X$.",
          "hint": "Pozitiflik ve alan = 1 kontrolü yapın. F(x) = x² bulunur.",
          "steps": [
            {
              "title": "Étape 1 : Vérification de la densité",
              "content": "$f(x) \\ge 0$ sur $\\mathbb{R}$ et $\\int_0^1 2x\\,dx = [x^2]_0^1 = 1$. Densité valide."
            },
            {
              "title": "Étape 2 : Probabilité d'intervalle",
              "content": "$$P(0.25 \\le X \\le 0.75) = \\int_{1/4}^{3/4} 2x\\,dx = [x^2]_{1/4}^{3/4} = \\frac{9}{16} - \\frac{1}{16} = \\frac{8}{16} = 0.5$$"
            },
            {
              "title": "Étape 3 : Fonction de répartition",
              "content": "$$F(x) = \\begin{cases} 0 & x < 0 \\\\ x^2 & 0 \\le x \\le 1 \\\\ 1 & x > 1 \\end{cases}$$"
            }
          ]
        },
        {
          "id": "olas_2024_ex5",
          "name": "Exercice 6 (2024 DS • Soru 5)",
          "subtitle": "Densité de la Loi Normale N(μ, σ)",
          "tag": "2024 DS Sınav Sorusu",
          "concepts": [
            "theoreme_central_limite"
          ],
          "enonce": "$X$ est une variable normale de paramètres $(\\mu, \\sigma)$. Donner la densité de $X$.",
          "hint": "Gauss dağılımı yoğunluk formülü.",
          "steps": [
            {
              "title": "Étape 1 : Formule de la densité gaussienne",
              "content": "Pour tout $x \\in \\mathbb{R}$ :<br>$$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)$$"
            }
          ]
        },
        {
          "id": "olas_2024_ex10",
          "name": "Exercice 7 (2024 DS • Soru 10 Bonus)",
          "subtitle": "Problème de Décision Image Binaire & Mélange de Lois Normales",
          "tag": "2024 DS Sınav Sorusu (Bonus +20 Pt)",
          "concepts": [
            "theoreme_bayes_totales",
            "theoreme_central_limite"
          ],
          "enonce": "Une image est composée de 2 régions, l'une blanche (fraction $1 - \\alpha$) et l'autre noire (fraction $\\alpha$).<br>Zone blanche : $X \\sim \\mathcal{N}(4, 4)$. Zone noire : $Y \\sim \\mathcal{N}(6, 9)$.<br>Un point choisi au hasard présente une valeur mesurée $Z = 5$.<br><br>Pour quelle valeur de $\\alpha$ a-t-on la même probabilité de se tromper en concluant que le point provient de la zone noire ou le contraire ?",
          "hint": "Bayes teoreminden P(B | Z=5) = P(N | Z=5) olması f_X(5) P(B) = f_Y(5) P(N) olmasını gerektirir.",
          "steps": [
            {
              "title": "Étape 1 : Densités normales en z = 5",
              "content": "$$f_X(5) = \\frac{1}{\\sqrt{2\\pi \\cdot 4}} e^{-\\frac{(5-4)^2}{2 \\cdot 4}} = \\frac{1}{2\\sqrt{2\\pi}} e^{-1/8}$$<br>$$f_Y(5) = \\frac{1}{\\sqrt{2\\pi \\cdot 9}} e^{-\\frac{(5-6)^2}{2 \\cdot 9}} = \\frac{1}{3\\sqrt{2\\pi}} e^{-1/18}$$"
            },
            {
              "title": "Étape 2 : Égalité des probabilités a posteriori",
              "content": "$$P(B \\mid Z = 5) = P(N \\mid Z = 5) \\iff (1 - \\alpha) f_X(5) = \\alpha f_Y(5)$$<br>$$(1 - \\alpha) \\frac{1}{2} e^{-1/8} = \\alpha \\frac{1}{3} e^{-1/18} \\implies \\frac{\\alpha}{1 - \\alpha} = \\frac{3}{2} e^{-5/72}$$"
            },
            {
              "title": "Étape 3 : Résolution",
              "content": "$$\\alpha = \\frac{\\frac{3}{2} e^{-5/72}}{1 + \\frac{3}{2} e^{-5/72}} = \\frac{3 e^{-5/72}}{2 + 3 e^{-5/72}} \\approx 0.583 \\quad (58.3\\%)$$La fraction noire doit valoir environ 58.3%."
            }
          ]
        }
      ]
    }
  }
};
