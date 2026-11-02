window.coursesData = window.coursesData || {};
window.coursesData.mat201_seriler = {
  "id": "mat201_seriler",
  "code": "MAT201",
  "title": "Seriler & Analiz",
  "faculty": "Lisans Matematik",
  "color": "#10b981",
  "icon": "courseSeriler",
  "modules": {
    "seriler_mod1": {
      "id": "seriler_mod1",
      "title": "Modül 1: TD 0 - Rappels sur les Suites (Diziler ve Yakınsaklık)",
      "shortTitle": "TD-0: Diziler & Yakınsaklık",
      "badge": "TD 0",
      "description": "Galatasaray Üniversitesi MAT201 TD 0 çalışma föyündeki tüm 12 teorem ve örnek: Dizi sınırlılığı, monotonluk, sandviç teoremi, epsilon-N ispatı, alt diziler ve Cauchy kriteri.",
      "exercises": [
        {
          "id": "s1_ex1",
          "name": "TD 0 • Ex 1 : Suites Bornées et Majorations",
          "subtitle": "Trigonometrik Terimli Dizi Sınırlılığı (Example 1.4 : u_n = 2 sin n - 3 cos(n²))",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes",
            "suites_adjacentes_cauchy"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Dizi Sınırlılığı (Suites Bornées)</div><div class=\"theory-box-body\">\nUne suite réelle $(u_n)_{n \\ge n_0}$ est dite :\n<ul>\n  <li><strong>majorée</strong> s'il existe $M \\in \\mathbb{R}$ tel que $u_n \\le M$ pour tout $n$,</li>\n  <li><strong>minorée</strong> s'il existe $m \\in \\mathbb{R}$ tel que $u_n \\ge m$ pour tout $n$,</li>\n  <li><strong>bornée</strong> si elle est à la fois majorée et minorée (i.e. $\\exists M > 0, \\; |u_n| \\le M$ pour tout $n$).</li>\n</ul>\n</div></div>\n<strong>TD 0 • Example 1.4 :</strong><br>\nSoit la suite $(u_n)_{n \\in \\mathbb{N}}$ définie par :\n$$ u_n = 2 \\sin n - 3 \\cos(n^2) $$\n(1) Rappeler l'encadrement des fonctions trigonométriques $\\sin$ et $\\cos$.<br>\n(2) À l'aide de l'inégalité triangulaire, montrer que la suite $(u_n)$ est bornée en trouvant une constante $M > 0$ explicite.<br>\n(3) Peut-on en déduire la convergence de la suite $(u_n)$ ? Justifier.r",
          "hint": "Trigonometrik fonksiyonlar $|\\sin \theta| \\le 1$ ve $|\\cos \theta| \\le 1$ aralığında salınır. Üçgen eşitsizliği $|a + b| \\le |a| + |b|$ ile mutlak değerce üst sınır $M$ bulunur. Unutma: Sınırlı olmak yakınsaklık için yeterli DEĞİLDİR (Örn: $(-1)^n$).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Propriétés Fondamentales des Fonctions Trigonométriques",
              "content": "<p>Pour tout nombre réel $\\theta \\in \\mathbb{R}$, les fonctions sinus et cosinus prennent leurs valeurs dans le segment $[-1, 1]$ :\n$$ \\forall \\theta \\in \\mathbb{R}, \\quad -1 \\le \\sin \\theta \\le 1 \\implies |\\sin \\theta| \\le 1 $$\n$$ \\forall \\theta \\in \\mathbb{R}, \\quad -1 \\le \\cos \\theta \\le 1 \\implies |\\cos \\theta| \\le 1 $$\nEn appliquant ces inégalités aux arguments $n$ et $n^2$ pour tout $n \\in \\mathbb{N}$ :\n$$ |\\sin n| \\le 1 \\quad \\text{et} \\quad |\\cos(n^2)| \\le 1 $$r"
            },
            {
              "title": "Étape 2 : Majoration par l'Inégalité Triangulaire & Bornitude",
              "content": "<p>Soit $n \\in \\mathbb{N}$. Appliquons l'inégalité triangulaire $|a + b| \\le |a| + |b|$ au terme général $u_n$ :\n$$ |u_n| = |2 \\sin n - 3 \\cos(n^2)| \\le |2 \\sin n| + |-3 \\cos(n^2)| $$\nPar homogénéité de la valeur absolue ($|\\lambda x| = |\\lambda| \\cdot |x|$) :\n$$ |u_n| \\le 2 |\\sin n| + 3 |\\cos(n^2)| $$\nPuisque $|\\sin n| \\le 1$ et $|\\cos(n^2)| \\le 1$ :\n$$ |u_n| \\le 2(1) + 3(1) = 5 $$\nIl existe donc une constante réelle $M = 5 > 0$ telle que pour tout $n \\in \\mathbb{N}$, $|u_n| \\le 5$.\nD'après la Proposition 1.3 du cours, <strong>la suite $(u_n)$ est bornée</strong> (elle est minorée par $-5$ et majorée par $5$).r"
            },
            {
              "title": "Étape 3 : Analyse de la Convergence & Conclusion Pédagogique",
              "content": "<p><strong>Non</strong>, la bornitude d'une suite n'implique pas sa convergence.\nBien que $(u_n)$ soit bornée par $5$, elle ne converge pas : les termes $\\sin n$ et $\\cos(n^2)$ oscillent de manière chaotique et dense dans $[-1, 1]$ lorsque $n$ parcourt $\\mathbb{N}$ (les multiples entiers de $1$ radian ne sont jamais commensurables avec $2\\pi$).\n<div class=\"theory-box tip\"><div class=\"theory-box-title\">Meral Hoca Sınav Püf Noktası</div><div class=\"theory-box-body\">\nSınavda her zaman şunu hatırla: <em>« Toute suite convergente est bornée, mais la réciproque est FAUSSE. »</em> (Her yakınsak dizi sınırlıdır, ancak her sınırlı dizi yakınsak olmak zorunda değildir). En klasik karşıt örnekler: $a_n = (-1)^n$ ve $u_n = \\sin n$.\n</div></div>r"
            }
          ]
        },
        {
          "id": "s1_ex2",
          "name": "TD 0 • Ex 2 : Monotonie et Signe de la Différence",
          "subtitle": "Artanlık ve Üst Sınır İncelemesi (Example 1.6 : u_n = n / (n+1))",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Example 1.6 :</strong><br>\nOn considère la suite $(u_n)_{n \\ge 0}$ définie par :\n$$ u_n = \\frac{n}{n+1} $$\n(1) Étudier le signe de la différence $u_{n+1} - u_n$ pour tout $n \\ge 0$. En déduire la monotonie de la suite $(u_n)$.<br>\n(2) Montrer que la suite $(u_n)$ est majorée par $1$.<br>\n(3) Calculer sa limite quand $n \\to +\\infty$ et vérifier le Théorème de la convergence monotone.r",
          "hint": "Açık formülle verilen bir dizinin monotonluğunu bulmanın en temel yolu $u_{n+1} - u_n$ farkının işaretini incelemektir. Paydaları eşitleyip payın işaretine bak.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Calcul de la Différence u_{n+1} - u_n",
              "content": "<p>Pour tout entier $n \\ge 0$, exprimons $u_{n+1}$ en remplaçant $n$ par $n+1$ :\n$$ u_{n+1} = \\frac{n+1}{(n+1)+1} = \\frac{n+1}{n+2} $$\nCalculons maintenant la différence $u_{n+1} - u_n$ :\n$$ u_{n+1} - u_n = \\frac{n+1}{n+2} - \\frac{n}{n+1} $$\nMettons les deux fractions au même dénominateur $(n+1)(n+2)$ :\n$$ u_{n+1} - u_n = \\frac{(n+1)^2 - n(n+2)}{(n+1)(n+2)} = \\frac{(n^2 + 2n + 1) - (n^2 + 2n)}{(n+1)(n+2)} = \\frac{1}{(n+1)(n+2)} $$\nPuisque $n \\ge 0$, le numérateur est $1 > 0$ et le dénominateur vérifie $(n+1)(n+2) > 0$.\nPar conséquent :\n$$ \\forall n \\ge 0, \\quad u_{n+1} - u_n > 0 \\iff u_{n+1} > u_n $$\nLa suite $(u_n)_{n \\ge 0}$ est donc <strong>strictement croissante</strong>.r"
            },
            {
              "title": "Étape 2 : Majoration de la Suite",
              "content": "<p>Pour tout $n \\ge 0$ :\n$$ u_n = \\frac{n}{n+1} = \\frac{n+1 - 1}{n+1} = 1 - \\frac{1}{n+1} $$\nComme $n+1 > 0$, la quantité $\\frac{1}{n+1}$ est strictement positive. Par suite :\n$$ 1 - \\frac{1}{n+1} < 1 \\implies u_n < 1 $$\nDe plus, $u_n \\ge 0$ pour tout $n \\ge 0$.\nLa suite $(u_n)$ est donc <strong>bornée</strong>, et en particulier <strong>majorée par 1</strong>.r"
            },
            {
              "title": "Étape 3 : Limite et Théorème de la Convergence Monotone",
              "content": "<p>Puisque $(u_n)$ est croissante et majorée par 1, le <strong>Théorème de convergence monotone (Théorème 1.22)</strong> garantit qu'elle converge vers une limite réelle $\\ell = \\sup_{n \\ge 0} u_n \\le 1$.\nCalculons directement cette limite :\n$$ \\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\frac{n}{n+1} = \\lim_{n \\to +\\infty} \\frac{1}{1 + \\frac{1}{n}} = \\frac{1}{1 + 0} = 1 $$\nLa suite converge bien vers $\\ell = 1 = \\sup \\{u_n \\mid n \\ge 0\\}$. ■r"
            }
          ]
        },
        {
          "id": "s1_ex3",
          "name": "TD 0 • Ex 3 : Monotonie par Quotient (u_n = 2ⁿ / n!)",
          "subtitle": "Faktöriyelli Dizi Monotonluğu ve Terim Oranı (Example 1.7)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Example 1.7 :</strong><br>\nSoit la suite $(u_n)_{n \\ge 1}$ définie par :\n$$ u_n = \\frac{2^n}{n!} $$\n(1) Justifier que $u_n > 0$ pour tout $n \\ge 1$.<br>\n(2) Calculer et simplifier le quotient $\\frac{u_{n+1}}{u_n}$.<br>\n(3) Montrer que $\\frac{u_{n+1}}{u_n} \\le 1$ pour tout $n \\ge 1$. En déduire la monotonie de la suite $(u_n)_{n \\ge 1}$.r",
          "hint": "Faktöriyel ve üstel ifadeler pozitif olduğunda $u_{n+1} - u_n$ yerine ardışık terimler oranı $\\frac{u_{n+1}}{u_n}$ incelenir. Bu oran $1$'den küçükse dizi azalandır.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Positivité et Expression du Quotient",
              "content": "<p>Pour tout entier $n \\ge 1$, on a $2^n > 0$ et $n! > 0$, donc $u_n > 0$.\nPuisque tous les termes sont strictement positifs, nous pouvons étudier la monotonie via le quotient $\\frac{u_{n+1}}{u_n}$ :\n$$ \\frac{u_{n+1}}{u_n} = \\frac{\\frac{2^{n+1}}{(n+1)!}}{\\frac{2^n}{n!}} = \\frac{2^{n+1}}{(n+1)!} \\times \\frac{n!}{2^n} $$\nUtilisons les propriétés fondamentales des puissances et de la factorielle :\n$$ 2^{n+1} = 2 \\cdot 2^n \\quad \\text{et} \\quad (n+1)! = (n+1) \\cdot n! $$\nOn obtient après simplification immédiate :\n$$ \\frac{u_{n+1}}{u_n} = \\frac{2 \\cdot 2^n \\cdot n!}{(n+1) \\cdot n! \\cdot 2^n} = \\frac{2}{n+1} $$r"
            },
            {
              "title": "Étape 2 : Comparaison à 1 et Conclusion sur la Monotonie",
              "content": "<p>Comparons le quotient obtenu $\\frac{2}{n+1}$ au nombre $1$ :\n$$ \\frac{u_{n+1}}{u_n} \\le 1 \\iff \\frac{2}{n+1} \\le 1 \\iff 2 \\le n+1 \\iff n \\ge 1 $$\nPour tout entier $n \\ge 1$, on a donc bien :\n$$ \\frac{u_{n+1}}{u_n} \\le 1 \\iff u_{n+1} \\le u_n $$\nLa suite $(u_n)_{n \\ge 1}$ est donc <strong>décroissante à partir du rang 1</strong>.<br>\nDe plus, pour $n \\ge 2$, on a $\\frac{2}{n+1} < 1$, donc la suite est <strong>strictement décroissante à partir du rang 2</strong> :\n$$ u_1 = 2, \\quad u_2 = 2, \\quad u_3 = \\frac{8}{6} = \\frac{4}{3} \\approx 1.33, \\quad u_4 = \\frac{16}{24} = \\frac{2}{3} \\approx 0.67, \\quad \\dots $$r"
            }
          ]
        },
        {
          "id": "s1_ex4",
          "name": "TD 0 • Ex 4 : Définition Rigoureuse ε - N de Limite",
          "subtitle": "Epsilon-N Tanımı ile 1/n → 0 İspatı (Example 1.9 & Définition 1.8)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Définition 1.8 & Example 1.9 :</strong><br>\n(1) Écrire avec des quantificateurs la définition formelle de « la suite $(u_n)$ converge vers $\\ell$ » ($\\varepsilon - N$).<br>\n(2) Démontrer rigoureusement à l'aide de cette définition que :\n$$ \\lim_{n \\to +\\infty} \\frac{1}{n} = 0 $$\nen explicitant le choix de l'entier $N \\in \\mathbb{N}$ pour tout $\\varepsilon > 0$ donné.r",
          "hint": "Verilen her $\\varepsilon > 0$ için $|u_n - \\ell| < \\varepsilon$ eşitsizliğini $n$ cinsinden çöz: $|1/n - 0| = 1/n < \\varepsilon \\iff n > 1/\\varepsilon$. Arşimet özelliği gereği $N > 1/\\varepsilon$ seçilir.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Rappel de la Définition Formelle avec Quantificateurs",
              "content": "<p>Soit $(u_n)_{n \\ge 1}$ une suite réelle et $\\ell \\in \\mathbb{R}$.\nPar définition (Définition 1.8), on dit que $(u_n)$ converge vers $\\ell$, et on note $\\lim_{n \\to +\\infty} u_n = \\ell$, si :\n$$ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall n \\ge N \\implies |u_n - \\ell| < \\varepsilon $$\nGéométriquement, cela signifie que pour tout intervalle ouvert $]\\ell - \\varepsilon, \\ell + \\varepsilon[$ centré en $\\ell$, tous les termes de la suite appartiennent à cet intervalle à partir du rang $N$.r"
            },
            {
              "title": "Étape 2 : Démonstration Complète pour u_n = 1/n",
              "content": "<p>Soit $\\varepsilon > 0$ fixé arbitrairement.\nNous cherchons un entier naturel $N \\in \\mathbb{N}$ tel que pour tout $n \\ge N$, $|u_n - 0| < \\varepsilon$.\nCalculons la distance :\n$$ |u_n - 0| = \\left| \\frac{1}{n} - 0 \\right| = \\frac{1}{n} $$\nNous souhaitons obtenir :\n$$ \\frac{1}{n} < \\varepsilon \\iff n > \\frac{1}{\\varepsilon} $$\nD'après la propriété archimédienne de $\\mathbb{R}$, il existe toujours un entier naturel $N \\in \\mathbb{N}$ tel que :\n$$ N > \\frac{1}{\\varepsilon} \\quad \\left( \\text{par exemple } N = \\left\\lfloor \\frac{1}{\\varepsilon} \\right\\rfloor + 1 \\right) $$\nVérifions alors l'implication : soit $n \\ge N$.\nPuisque $n \\ge N > \\frac{1}{\\varepsilon}$, nous avons par décroissance de la fonction inverse sur $]0, +\\infty[$ :\n$$ \\left| \\frac{1}{n} - 0 \\right| = \\frac{1}{n} \\le \\frac{1}{N} < \\varepsilon $$\nNous avons ainsi démontré que :\n$$ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall n \\ge N \\implies \\left| \\frac{1}{n} - 0 \\right| < \\varepsilon $$\nCe qui établit rigoureusement que $\\lim_{n \\to +\\infty} \\frac{1}{n} = 0$. ■r"
            }
          ]
        },
        {
          "id": "s1_ex5",
          "name": "TD 0 • Ex 5 : Suites Bornées mais Divergentes",
          "subtitle": "Salınım ve Yakınsaklığın Olmayışı (Example 1.12 & Proposition 1.11)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Proposition 1.11 & Example 1.12 :</strong><br>\n(1) Rappeler l'énoncé de la Proposition 1.11 : toute suite convergente est-elle bornée ?<br>\n(2) La réciproque est-elle vraie ? Justifier en étudiant la suite $u_n = (-1)^n$ :\n<ul>\n  <li>Montrer que la suite $(u_n)$ est bornée.</li>\n  <li>Montrer qu'elle ne converge pas.</li>\n</ul>r",
          "hint": "Bir dizinin iki farklı alt dizisi farklı limitlere gidiyorsa o dizi ıraksaktır ($u_{2k} = 1 \\to 1$ ve $u_{2k+1} = -1 \\to -1$).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Proposition 1.11 & Bornitude de (-1)ⁿ",
              "content": "<p><strong>Proposition 1.11 :</strong> Toute suite convergente dans $\\mathbb{R}$ est bornée.\nEn effet, si $u_n \\to \\ell$, pour $\\varepsilon = 1$, il existe $N$ tel que pour tout $n \\ge N$, $|u_n| \\le |\\ell| + 1$. Il suffit alors de poser $M = \\max(|u_0|, |u_1|, \\dots, |u_{N-1}|, |\\ell|+1)$ pour avoir $|u_n| \\le M$ pour tout $n$.\n<p><strong>La réciproque est FAUSSE :</strong> une suite bornée n'est pas nécessairement convergente.\nConsidérons la suite $u_n = (-1)^n$ pour $n \\in \\mathbb{N}$.\nPour tout $n \\in \\mathbb{N}$, on a $|u_n| = |(-1)^n| = 1 \\le 1$.\nLa suite $(u_n)$ est donc parfaitement <strong>bornée</strong> (tous ses termes appartiennent à $\\{-1, 1\\} \\subset [-1, 1]$).r"
            },
            {
              "title": "Étape 2 : Preuve de la Non-Convergence par les Sous-Suites",
              "content": "<p>Montrons que $(u_n)$ ne converge pas.\nD'après la Proposition 1.26, si une suite converge vers une limite $\\ell$, alors TOUTE sous-suite extraite converge également vers $\\ell$.\nExtrayons les deux sous-suites canoniques des indices pairs et impairs :\n<ul>\n  <li><strong>Sous-suite des rangs pairs :</strong> $u_{2k} = (-1)^{2k} = ((-1)^2)^k = 1^k = 1$.<br>\n  C'est une suite constante égale à 1, donc $\\lim_{k \\to +\\infty} u_{2k} = 1$.</li>\n  <li><strong>Sous-suite des rangs impairs :</strong> $u_{2k+1} = (-1)^{2k+1} = (-1)^{2k} \\cdot (-1) = -1$.<br>\n  C'est une suite constante égale à $-1$, donc $\\lim_{k \\to +\\infty} u_{2k+1} = -1$.</li>\n</ul>\nPuisque les deux sous-suites $(u_{2k})$ et $(u_{2k+1})$ convergent vers des limites distinctes ($1 \\ne -1$), d'après la Proposition 1.27, la suite $(u_n)$ <strong>ne converge pas (elle diverge par oscillation)</strong>. ■r"
            }
          ]
        },
        {
          "id": "s1_ex6",
          "name": "TD 0 • Ex 6 : Opérations sur les Limites Rationnelles",
          "subtitle": "Polinom Oranlarında Baskın Terim Faktörizasyonu (Example 1.14 & 1.15)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Example 1.14 & 1.15 :</strong><br>\nÀ l'aide des opérations sur les limites (Proposition 1.13), calculer les limites des suites suivantes :\n$$ (a) \\quad u_n = \\frac{3n+2}{2n+1} \\qquad (n \\ge 0) $$\n$$ (b) \\quad v_n = \\frac{n^2 + 2n}{3n^2 - 1} \\qquad (n \\ge 1) $$r",
          "hint": "$n \\to +\\infty$ iken belirsizlikleri ($\frac{\\infty}{\\infty}$) gidermek için pay ve paydayı en yüksek dereceli terimin parantezine al, $1/n \\to 0$ kuralını uygula.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Calcul de la Limite pour la Suite (a)",
              "content": "<p>Pour tout $n \\ge 1$, factorisons le numérateur et le dénominateur par le terme dominant $n$ :\n$$ u_n = \\frac{3n+2}{2n+1} = \\frac{n \\left(3 + \\frac{2}{n}\\right)}{n \\left(2 + \\frac{1}{n}\\right)} = \\frac{3 + \\frac{2}{n}}{2 + \\frac{1}{n}} $$\nPuisque $\\lim_{n \\to +\\infty} \\frac{1}{n} = 0$, nous avons par opérations sur les limites :\n$$ \\lim_{n \\to +\\infty} \\left(3 + \\frac{2}{n}\\right) = 3 + 2(0) = 3 $$\n$$ \\lim_{n \\to +\\infty} \\left(2 + \\frac{1}{n}\\right) = 2 + 0 = 2 \\ne 0 $$\nPar quotient de limites (Proposition 1.13) :\n$$ \\lim_{n \\to +\\infty} u_n = \\frac{3}{2} $$r"
            },
            {
              "title": "Étape 2 : Calcul de la Limite pour la Suite (b)",
              "content": "<p>Pour tout $n \\ge 1$, le terme dominant au numérateur et au dénominateur est $n^2$. Factorisons par $n^2$ :\n$$ v_n = \\frac{n^2 + 2n}{3n^2 - 1} = \\frac{n^2 \\left(1 + \\frac{2}{n}\\right)}{n^2 \\left(3 - \\frac{1}{n^2}\\right)} = \\frac{1 + \\frac{2}{n}}{3 - \\frac{1}{n^2}} $$\nComme $\\lim_{n \\to +\\infty} \\frac{2}{n} = 0$ et $\\lim_{n \\to +\\infty} \\frac{1}{n^2} = 0$, il vient :\n$$ \\lim_{n \\to +\\infty} \\left(1 + \\frac{2}{n}\\right) = 1 \\quad \\text{et} \\quad \\lim_{n \\to +\\infty} \\left(3 - \\frac{1}{n^2}\\right) = 3 \\ne 0 $$\nPar conséquent :\n$$ \\lim_{n \\to +\\infty} v_n = \\frac{1}{3} $$r"
            }
          ]
        },
        {
          "id": "s1_ex7",
          "name": "TD 0 • Ex 7 : Théorème des Deux Gendarmes",
          "subtitle": "Sandviç Teoremi ile Limit Hesabı (Example 1.18 : u_n = (3 + sin(n²)) / n)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Example 1.18 & Théorème 1.17 :</strong><br>\nSoit la suite $(u_n)_{n \\ge 1}$ définie par :\n$$ u_n = \\frac{3 + \\sin(n^2)}{n} $$\n(1) Rappeler l'énoncé du Théorème des deux gendarmes.<br>\n(2) Encadrer le terme $3 + \\sin(n^2)$ pour tout $n \\ge 1$.<br>\n(3) En déduire un encadrement de $u_n$, puis calculer la limite $\\lim_{n \\to +\\infty} u_n$.r",
          "hint": "Trigonometrik ifadeyi $-1 \\le \\sin(n^2) \\le 1$ ile sınırla, her tarafa 3 ekle, sonra $n$'ye böl. İki tarafın limiti aynı çıkınca sandviç teoreminden ortadaki limit bulunur.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Théorème des Deux Gendarmes & Encadrement du Numérateur",
              "content": "<p><strong>Théorème des deux gendarmes (Théorème 1.17) :</strong> Soient $(a_n)$, $(u_n)$ et $(b_n)$ trois suites réelles telles que $a_n \\le u_n \\le b_n$ à partir d'un certain rang. Si $\\lim_{n \\to +\\infty} a_n = \\lim_{n \\to +\\infty} b_n = \\ell$, alors la suite $(u_n)$ converge et $\\lim_{n \\to +\\infty} u_n = \\ell$.\n<p>Pour tout entier $n \\ge 1$, la fonction sinus vérifie :\n$$ -1 \\le \\sin(n^2) \\le 1 $$\nAjoutons 3 à chaque membre de cette double inégalité :\n$$ 3 - 1 \\le 3 + \\sin(n^2) \\le 3 + 1 \\implies 2 \\le 3 + \\sin(n^2) \\le 4 $$r"
            },
            {
              "title": "Étape 2 : Encadrement de la Suite et Passage à la Limite",
              "content": "<p>Puisque $n \\ge 1 > 0$, divisons l'inégalité précédente par $n$ sans changer le sens des inégalités :\n$$ \\forall n \\ge 1, \\quad \\frac{2}{n} \\le \\frac{3 + \\sin(n^2)}{n} \\le \\frac{4}{n} \\implies \\frac{2}{n} \\le u_n \\le \\frac{4}{n} $$\nCalculons les limites des deux suites encadrantes :\n$$ \\lim_{n \\to +\\infty} \\frac{2}{n} = 2 \\times 0 = 0 $$\n$$ \\lim_{n \\to +\\infty} \\frac{4}{n} = 4 \\times 0 = 0 $$\nPuisque les deux gendarmes convergent vers la même limite $\\ell = 0$, d'après le théorème des deux gendarmes, la suite $(u_n)$ converge et :\n$$ \\lim_{n \\to +\\infty} \\frac{3 + \\sin(n^2)}{n} = 0 \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s1_ex8",
          "name": "TD 0 • Ex 8 : Gendarmes avec Factorielle & Majoration Géométrique",
          "subtitle": "Faktöriyel / Üstel Limit Kanıtı (Example 1.20 : lim 2ⁿ / n! = 0)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Example 1.20 :</strong><br>\nSoit $u_n = \\frac{2^n}{n!}$ pour $n \\ge 1$.<br>\n(1) Montrer que pour tout $n \\ge 2$, on a $\\frac{u_{n+1}}{u_n} \\le \\frac{2}{3}$.<br>\n(2) En déduire par récurrence immédiate que pour tout $n \\ge 2$ :\n$$ 0 < u_n \\le u_2 \\cdot \\left(\\frac{2}{3}\\right)^{n-2} = 2 \\cdot \\left(\\frac{2}{3}\\right)^{n-2} $$\n(3) À l'aide du théorème des deux gendarmes, prouver rigoureusement que :\n$$ \\lim_{n \\to +\\infty} \\frac{2^n}{n!} = 0 $$r",
          "hint": "Bu soru derste hocanın özellikle sorduğu kilit adımdır! $n \\ge 2$ için $n+1 \\ge 3$ olduğundan $u_{n+1}/u_n = 2/(n+1) \\le 2/3$. Ardışık çarpmayla $u_n \\le u_2 (2/3)^{n-2}$ geometrik dizisine sıkıştırılır.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Majoration Uniforme du Quotient",
              "content": "<p>D'après l'Exemple 1.7 (exercice 3), nous savons que :\n$$ \\forall n \\ge 1, \\quad \\frac{u_{n+1}}{u_n} = \\frac{2}{n+1} $$\nPour tout entier $n \\ge 2$, on a $n+1 \\ge 3$, d'où :\n$$ \\frac{2}{n+1} \\le \\frac{2}{3} $$\nAinsi, pour tout $n \\ge 2$, nous avons la majoration fondamentale :\n$$ u_{n+1} \\le \\frac{2}{3} u_n $$r"
            },
            {
              "title": "Étape 2 : Établissement de la Majoration Géométrique",
              "content": "<p>Calculons les premiers termes pour initialiser la récurrence :\n$$ u_1 = \\frac{2^1}{1!} = 2, \\quad u_2 = \\frac{2^2}{2!} = \\frac{4}{2} = 2 $$\nEn écrivant l'inégalité de l'Étape 1 de proche en proche pour les indices successifs :\n$$ u_3 \\le \\frac{2}{3} u_2 $$\n$$ u_4 \\le \\frac{2}{3} u_3 \\le \\left(\\frac{2}{3}\\right)^2 u_2 $$\n$$ u_n \\le \\left(\\frac{2}{3}\\right)^{n-2} u_2 = 2 \\cdot \\left(\\frac{2}{3}\\right)^{n-2} $$\nPuisque $2^n > 0$ et $n! > 0$, le terme $u_n$ est strictement positif pour tout $n$.\nOn obtient ainsi l'encadrement géométrique valable pour tout $n \\ge 2$ :\n$$ 0 < u_n \\le 2 \\left(\\frac{2}{3}\\right)^{n-2} $$r"
            },
            {
              "title": "Étape 3 : Théorème des Gendarmes & Conclusion",
              "content": "<p>Étudions les deux suites qui encadrent $u_n$ :\n<ul>\n  <li>La suite minorante est identiquement nulle, donc elle tend vers 0.</li>\n  <li>Pour la suite majorante, puisque $\\left|\\frac{2}{3}\\right| < 1$, la suite géométrique $\\left(\\frac{2}{3}\\right)^{n-2}$ tend vers 0 quand $n \\to +\\infty$ :\n  $$ \\lim_{n \\to +\\infty} 2 \\left(\\frac{2}{3}\\right)^{n-2} = 2 \\times 0 = 0 $$</li>\n</ul>\nD'après le <strong>théorème des deux gendarmes</strong>, la suite $(u_n)$ converge nécessairement et :\n$$ \\lim_{n \\to +\\infty} \\frac{2^n}{n!} = 0 \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s1_ex9",
          "name": "TD 0 • Ex 9 : Croissances Comparées et Limites Fondamentales",
          "subtitle": "Temel Büyüme Hiyerarşisi (Section 1.6 & Example 1.21)",
          "tag": "TD 0",
          "concepts": [
            "theoreme_dalembert"
          ],
          "enonce": "<strong>TD 0 • Section 1.6 & Example 1.21 :</strong><br>\nDans le cours, les limites fondamentales suivantes sont rappelées :\n<ul>\n  <li>Pour tout $\\alpha > 0$ et $a > 1$ : $\\ln n \\ll n^\\alpha \\ll a^n \\ll n! \\ll n^n$.</li>\n  <li>$\\lim_{n \\to +\\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2.718$.</li>\n</ul>\n(1) En déduire les limites suivantes :\n$$ \\lim_{n \\to +\\infty} \\frac{\\ln n}{n} \\qquad \\text{et} \\qquad \\lim_{n \\to +\\infty} \\frac{n^2}{2^n} $$\n(2) Calculer $\\lim_{n \\to +\\infty} \\left(1 + \\frac{2}{n}\\right)^n$ en utilisant la limite exponentielle fondamentale.r",
          "hint": "Büyüme hiyerarşisi: Logaritma $\\ll$ Polinom $\\ll$ Üstel $\\ll$ Faktöriyel $\\ll n^n$. $(1+x/n)^n \\to e^x$ formülü d'Alembert ve Cauchy testlerinde sürekli karşımıza çıkacaktır.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Application Directe des Croissances Comparées",
              "content": "<p>D'après les théorèmes de croissances comparées :\n<ul>\n  <li>La fonction logarithme croît strictement moins vite que toute puissance positive de $n$ :\n  $$ \\lim_{n \\to +\\infty} \\frac{\\ln n}{n^\\alpha} = 0 \\quad (\\text{ici avec } \\alpha = 1) \\implies \\lim_{n \\to +\\infty} \\frac{\\ln n}{n} = 0 $$</li>\n  <li>Toute puissance polynomiale croît strictement moins vite que toute suite exponentielle de base $a > 1$ :\n  $$ \\lim_{n \\to +\\infty} \\frac{n^p}{a^n} = 0 \\quad (\\text{ici avec } p = 2, \\; a = 2 > 1) \\implies \\lim_{n \\to +\\infty} \\frac{n^2}{2^n} = 0 $$</li>\n</ul>r"
            },
            {
              "title": "Étape 2 : Généralisation de la Limite Exponentielle (1 + x/n)ⁿ → eˣ",
              "content": "<p>Calculons $\\lim_{n \\to +\\infty} \\left(1 + \\frac{2}{n}\\right)^n$.\nPassons sous forme exponentielle :\n$$ \\left(1 + \\frac{2}{n}\\right)^n = \\exp\\left( n \\ln\\left(1 + \\frac{2}{n}\\right) \\right) $$\nLorsque $n \\to +\\infty$, $\\frac{2}{n} \\to 0$. Utilisons le développement limité usuel $\\ln(1 + u) = u + o(u)$ au voisinage de 0 avec $u = \\frac{2}{n}$ :\n$$ \\ln\\left(1 + \\frac{2}{n}\\right) = \\frac{2}{n} + o\\left(\\frac{1}{n}\\right) $$\nMultiplions par $n$ :\n$$ n \\ln\\left(1 + \\frac{2}{n}\\right) = n \\left(\\frac{2}{n} + o\\left(\\frac{1}{n}\\right)\\right) = 2 + o(1) \\xrightarrow[n \\to +\\infty]{} 2 $$\nPar continuité de la fonction exponentielle sur $\\mathbb{R}$ :\n$$ \\lim_{n \\to +\\infty} \\left(1 + \\frac{2}{n}\\right)^n = e^2 \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s1_ex10",
          "name": "TD 0 • Ex 10 : Convergence des Suites Monotones et Bornées",
          "subtitle": "Monoton Yakınsaklık Teoremi (Example 1.23 & Théorème 1.22 : u_n = 2 - 1/(n+1))",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Théorème 1.22 & Example 1.23 :</strong><br>\nSoit $(u_n)_{n \\ge 0}$ la suite définie par :\n$$ u_n = 2 - \\frac{1}{n+1} $$\n(1) Rappeler le Théorème de convergence monotone.<br>\n(2) Montrer que $(u_n)$ est strictement croissante.<br>\n(3) Montrer que $(u_n)$ est majorée par 2.<br>\n(4) En déduire que la suite converge et déterminer sa limite $\\lim_{n \\to +\\infty} u_n = \\sup_{n \\ge 0} u_n$.r",
          "hint": "$u_{n+1} - u_n$ farkını hesapla. Artan ve üstten sınırlı her dizi kesinlikle $\\mathbb{R}$ içinde yakınsar.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Théorème de Convergence Monotone",
              "content": "<p><strong>Théorème 1.22 :</strong>\n<ul>\n  <li>Toute suite croissante et majorée converge dans $\\mathbb{R}$, et sa limite est sa borne supérieure : $\\lim_{n \\to +\\infty} u_n = \\sup \\{u_n \\mid n \\ge n_0\\}$.</li>\n  <li>Toute suite décroissante et minorée converge dans $\\mathbb{R}$, et sa limite est sa borne inférieure : $\\lim_{n \\to +\\infty} u_n = \\inf \\{u_n \\mid n \\ge n_0\\}$.</li>\n</ul>r"
            },
            {
              "title": "Étape 2 : Monotonie et Bornitude",
              "content": "<p>Pour tout entier $n \\ge 0$, calculons $u_{n+1} - u_n$ :\n$$ u_{n+1} - u_n = \\left(2 - \\frac{1}{n+2}\\right) - \\left(2 - \\frac{1}{n+1}\\right) = \\frac{1}{n+1} - \\frac{1}{n+2} $$\nMettons au même dénominateur :\n$$ u_{n+1} - u_n = \\frac{(n+2) - (n+1)}{(n+1)(n+2)} = \\frac{1}{(n+1)(n+2)} > 0 $$\nLa suite $(u_n)$ est donc <strong>strictement croissante</strong>.\n<p>De plus, pour tout $n \\ge 0$, comme $\\frac{1}{n+1} > 0$ :\n$$ u_n = 2 - \\frac{1}{n+1} < 2 $$\nLa suite $(u_n)$ est donc <strong>majorée par 2</strong>.r"
            },
            {
              "title": "Étape 3 : Convergence et Limite",
              "content": "<p>Puisque $(u_n)$ est croissante et majorée par 2, le Théorème 1.22 garantit qu'elle converge vers une limite réelle $\\ell = \\sup_{n \\ge 0} u_n \\le 2$.\nCalculons directement la limite :\n$$ \\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\left(2 - \\frac{1}{n+1}\\right) = 2 - 0 = 2 $$\nAinsi, $\\lim_{n \\to +\\infty} u_n = 2 = \\sup_{n \\ge 0} u_n$. ■r"
            }
          ]
        },
        {
          "id": "s1_ex11",
          "name": "TD 0 • Ex 11 : Sous-suites et Preuve de Divergence",
          "subtitle": "Alt Dizilerle Iraksaklık İspatı (Example 1.28 & 1.29 : u_n = (-1)ⁿ n/(n+1))",
          "tag": "TD 0",
          "concepts": [
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 0 • Example 1.28 & 1.29 :</strong><br>\nSoit la suite $(u_n)_{n \\ge 0}$ définie par :\n$$ u_n = (-1)^n \\frac{n}{n+1} $$\n(1) Calculer les premiers termes $u_0, u_1, u_2, u_3$. La suite est-elle bornée ?<br>\n(2) Déterminer la sous-suite des termes d'indice pair $(u_{2k})_{k \\ge 0}$ et calculer sa limite quand $k \\to +\\infty$.<br>\n(3) Déterminer la sous-suite des termes d'indice impair $(u_{2k+1})_{k \\ge 0}$ et calculer sa limite quand $k \\to +\\infty$.<br>\n(4) Conclure sur la convergence de la suite $(u_n)$.r",
          "hint": "Bir dizinin yakınsak olabilmesi için TÜM alt dizilerinin aynı limite gitmesi şarttır. $u_{2k} \\to 1$ ve $u_{2k+1} \\to -1$ bulununca teorem gereği dizi ıraksar.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Calcul des Premiers Termes et Bornitude",
              "content": "<p>Calculons les premiers termes :\n$$ u_0 = 0, \\quad u_1 = - \\frac{1}{2}, \\quad u_2 = \\frac{2}{3}, \\quad u_3 = - \\frac{3}{4} $$\nPour tout $n \\ge 0$, on a $|u_n| = \\left|(-1)^n \\frac{n}{n+1}\\right| = \\frac{n}{n+1} < 1$.\nLa suite $(u_n)$ est donc <strong>bornée</strong> dans $]-1, 1[$. r"
            },
            {
              "title": "Étape 2 : Étude des Deux Sous-Suites Extraites",
              "content": "<p>Extrayons les deux sous-suites :\n<ul>\n  <li><strong>Sous-suite paire ($n = 2k$) :</strong>\n  $$ u_{2k} = (-1)^{2k} \\frac{2k}{2k+1} = \\frac{2k}{2k+1} = \\frac{2}{2 + \\frac{1}{k}} \\xrightarrow[k \\to +\\infty]{} 1 $$</li>\n  <li><strong>Sous-suite impaire ($n = 2k+1$) :</strong>\n  $$ u_{2k+1} = (-1)^{2k+1} \\frac{2k+1}{(2k+1)+1} = - \\frac{2k+1}{2k+2} = - \\frac{2 + \\frac{1}{k}}{2 + \\frac{2}{k}} \\xrightarrow[k \\to +\\infty]{} -1 $$</li>\n</ul>r"
            },
            {
              "title": "Étape 3 : Conclusion par la Proposition 1.27",
              "content": "<p><strong>Proposition 1.27 :</strong> Si une suite possède deux sous-suites qui convergent vers deux limites différentes, alors la suite ne converge pas.\nIci :\n$$ \\lim_{k \\to +\\infty} u_{2k} = 1 \\quad \\text{et} \\quad \\lim_{k \\to +\\infty} u_{2k+1} = -1 $$\nPuisque $1 \\ne -1$, la suite $(u_n)$ <strong>est divergente</strong> (bien qu'elle soit bornée). ■r"
            }
          ]
        },
        {
          "id": "s1_ex12",
          "name": "TD 0 • Ex 12 : Suites de Cauchy et Complétude de ℝ",
          "subtitle": "Cauchy Kriteri ile Limiti Bilmeden Yakınsaklık (Example 1.32 & Théorème 1.31)",
          "tag": "TD 0",
          "concepts": [
            "suites_adjacentes_cauchy"
          ],
          "enonce": "<strong>TD 0 • Définition 1.30, Théorème 1.31 & Example 1.32 :</strong><br>\n(1) Rappeler la définition d'une suite de Cauchy dans $\\mathbb{R}$.<br>\n(2) Montrer directement que la suite $u_n = \\frac{1}{n}$ ($n \\ge 1$) est une suite de Cauchy.<br>\n(3) Énoncer le Critère de Cauchy (Théorème 1.31) et expliquer pourquoi il sera crucial pour l'étude des séries numériques.r",
          "hint": "Cauchy tanımı: Her $\\varepsilon > 0$ için $m, n \\ge N$ iken $|u_n - u_m| < \\varepsilon$. Üçgen eşitsizliği ile $|1/n - 1/m| \\le 1/n + 1/m \\le 2/N < \\varepsilon$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Définition d'une Suite de Cauchy",
              "content": "<p><strong>Définition 1.30 :</strong> Une suite réelle $(a_n)_{n \\ge 1}$ est dite <strong>de Cauchy</strong> si :\n$$ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall m, n \\ge N \\implies |a_n - a_m| < \\varepsilon $$\nIntuituon : Les termes de la suite deviennent arbitrairement proches les uns des autres lorsque les indices deviennent suffisamment grands, <em>sans que l'on ait besoin de connaître à l'avance la limite $\\ell$</em>.r"
            },
            {
              "title": "Étape 2 : Preuve Directe pour u_n = 1/n",
              "content": "<p>Soit $\\varepsilon > 0$. Soient $m, n \\ge N$.\nPar l'inégalité triangulaire :\n$$ |u_n - u_m| = \\left| \\frac{1}{n} - \\frac{1}{m} \\right| \\le \\frac{1}{n} + \\frac{1}{m} $$\nComme $n \\ge N$ et $m \\ge N$, on a $\\frac{1}{n} \\le \\frac{1}{N}$ et $\\frac{1}{m} \\le \\frac{1}{N}$. Par conséquent :\n$$ |u_n - u_m| \\le \\frac{1}{N} + \\frac{1}{N} = \\frac{2}{N} $$\nPour rendre cette quantité strictement inférieure à $\\varepsilon$, il suffit de choisir $N \\in \\mathbb{N}$ tel que :\n$$ \\frac{2}{N} < \\varepsilon \\iff N > \\frac{2}{\\varepsilon} $$\nAinsi, pour tout $\\varepsilon > 0$, en choisissant $N = \\left\\lfloor \\frac{2}{\\varepsilon} \\right\\rfloor + 1$, on a :\n$$ \\forall m, n \\ge N \\implies |u_n - u_m| < \\varepsilon $$\nLa suite $(u_n) = (1/n)$ est donc bien une <strong>suite de Cauchy</strong>.r"
            },
            {
              "title": "Étape 3 : Théorème 1.31 & Rôle Fondamental pour les Séries",
              "content": "<p><strong>Théorème 1.31 (Critère de Cauchy dans $\\mathbb{R}$) :</strong>\nDans le corps des réels $\\mathbb{R}$, une suite converge si et seulement si elle est de Cauchy.\n<p><strong>Rôle crucial pour les séries numériques :</strong>\nUne série $\\sum u_n$ converge si et seulement si sa suite des sommes partielles $S_n = \\sum_{k=0}^n u_k$ est de Cauchy.\nOr :\n$$ |S_m - S_n| = \\left| \\sum_{k=n+1}^m u_k \\right| \\le \\sum_{k=n+1}^m |u_k| $$\nSi la série des valeurs absolues $\\sum |u_k|$ converge, alors la suite de ses sommes partielles est de Cauchy, ce qui force $(S_n)$ à être de Cauchy dans $\\mathbb{R}$, et donc à converger !\nC'est la clé de voûte de la démonstration du grand théorème : <strong>« Toute série absolument convergente est convergente »</strong>. ■r"
            }
          ]
        },
        {
          "id": "s1_ex13",
          "name": "TD 0 • Ex 13 : Suite Récurrente & Théorème du Point Fixe",
          "subtitle": "Özyinelemeli Dizi ve Sabit Nokta Teoremi (u_{n+1} = √(2+u_n))",
          "tag": "Diziler (TD 0)",
          "concepts": [
            "theoreme_point_fixe",
            "theoreme_gendarmes"
          ],
          "enonce": "<p>Soit la suite $(u_n)_{n \\in \\mathbb{N}}$ définie par $u_0 = 0$ et pour tout $n \\ge 0$ :<br>$$ u_{n+1} = \\sqrt{2 + u_n} $$<br><strong>(1)</strong> Montrer par récurrence que pour tout $n \\in \\mathbb{N}$, $0 \\le u_n \\le 2$.<br><strong>(2)</strong> Montrer que $(u_n)$ est croissante.<br><strong>(3)</strong> En déduire que $(u_n)$ converge et déterminer sa limite $L$.</p>",
          "solTitle": "Solution Détaillée (Rédaction Examen)",
          "steps": [
            {
              "title": "Étape 1 : Encadrement par Récurrence (0 ≤ u_n ≤ 2)",
              "content": "<p>Démontrons par récurrence que pour tout $n \\in \\mathbb{N}$, $0 \\le u_n \\le 2$ :</p><ul style=\"margin-left: 22px; margin-bottom: 12px; line-height: 1.7;\"><li><strong>Initialisation :</strong> Pour $n=0$, $u_0 = 0 \\in [0, 2]$. L'initialisation est vérifiée.</li><li><strong>Hérédité :</strong> Supposons que $0 \\le u_n \\le 2$ pour un certain rang $n$. Alors $2 \\le 2 + u_n \\le 4$. Par stricte croissance de la fonction racine carrée sur $[0, +\\infty[$ :<br>$$\\sqrt{2} \\le \\sqrt{2 + u_n} \\le \\sqrt{4} = 2 \\implies 0 \\le u_{n+1} \\le 2$$</li></ul><p>La propriété est donc établie pour tout $n \\in \\mathbb{N}$. La suite $(u_n)$ est donc <strong>bornée</strong>.</p>"
            },
            {
              "title": "Étape 2 : Monotonie de la Suite (u_{n+1} - u_n ≥ 0)",
              "content": "<p>Étudions le signe de la différence $u_{n+1} - u_n$ en multipliant par la quantité conjuguée :<br>$$u_{n+1} - u_n = \\sqrt{2 + u_n} - u_n = \\frac{(\\sqrt{2 + u_n} - u_n)(\\sqrt{2 + u_n} + u_n)}{\\sqrt{2 + u_n} + u_n} = \\frac{2 + u_n - u_n^2}{\\sqrt{2 + u_n} + u_n}$$</p><p>Factorisons le numérateur du second degré : $-u_n^2 + u_n + 2 = (2 - u_n)(1 + u_n)$.<br>D'où :<br>$$u_{n+1} - u_n = \\frac{(2 - u_n)(1 + u_n)}{\\sqrt{2 + u_n} + u_n}$$</p><p>Puisque d'après l'Étape 1 on a $u_n \\in [0, 2]$, tous les facteurs sont positifs : $(2 - u_n) \\ge 0$, $(1 + u_n) > 0$ et le dénominateur est strictement positif. Par conséquent, $u_{n+1} - u_n \\ge 0$. La suite $(u_n)$ est donc <strong>croissante</strong>.</p>"
            },
            {
              "title": "Étape 3 : Convergence & Équation du Point Fixe (L = 2)",
              "content": "<p>Puisque $(u_n)$ est croissante et majorée par 2, d'après le théorème de la limite monotone, elle converge vers une limite finie notée $L \\in [0, 2]$.</p><p>Par continuité de la fonction $f(x) = \\sqrt{2 + x}$ sur $[0, 2]$, la limite satisfait nécessairement l'équation de <span class=\"term-link\" onclick=\"openConceptModal('theoreme_point_fixe')\">point fixe</span> :<br>$$L = \\sqrt{2 + L} \\iff L^2 - L - 2 = 0 \\iff (L - 2)(L + 1) = 0$$</p><p>Les solutions algébriques sont $L = 2$ et $L = -1$. Puisque tous les termes de la suite sont positifs ($u_n \\ge 0$), la limite vérifie $L \\ge 0$, ce qui élimine la solution négative $L = -1$.</p><p><strong>Conclusion finale :</strong> La suite $(u_n)$ converge vers $\\mathbf{L = 2}$. ■</p>"
            }
          ],
          "hint": "Tümevarımla u_n ≤ 2 göster. Eşlenikle u_{n+1} - u_n farkını çarpanlarına ayır ((2-u_n)(1+u_n)). Artan ve üstten sınırlı dizi yakınsar; limiti L = √(2+L) sabit nokta denkleminin pozitif kökü olan 2'dir."
        }
      ],
      "breadcrumb": "MAT201 > Modül 1 (TD 0) > Diziler & Yakınsaklık",
      "concepts": [
        "theoreme_gendarmes",
        "suites_adjacentes_cauchy",
        "theoreme_point_fixe"
      ],
      "theoryPages": [
        {
          "title": "1. Dizilerin Tanımı, Sınırlılık & Monotonluk",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 0 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Dizilerde Sınırlılık, Monotonluk ve Limit Kavramı</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Tanım 1.1 & 1.2: Dizi ve Sınırlılık (Suites Bornées)</div>\n  <div class=\"theory-box-body\">\n    <p>Reel sayı dizisi $(u_n)_{n \\ge n_0}$, doğal sayılardan $\\mathbb{R}$'ye tanımlı bir fonksiyondur ($n \\mapsto u_n$).</p>\n    <ul>\n      <li><strong>Üstten Sınırlı (Majorée) :</strong> $\\exists M \\in \\mathbb{R}, \\; \forall n, \\; u_n \\le M$.</li>\n      <li><strong>Alttan Sınırlı (Minorée) :</strong> $\\exists m \\in \\mathbb{R}, \\; \forall n, \\; u_n \\ge m$.</li>\n      <li><strong>Sınırlı (Bornée) :</strong> Dizi hem alttan hem üstten sınırlıdır $\\iff \\exists K > 0, \\; \forall n, \\; |u_n| \\le K$.</li>\n    </ul>\n    <p><em>Örnek:</em> Trigonometrik ifadeler her zaman $[-1, 1]$ aralığında sınırlıdır: $-1 \\le \\sin(x) \\le 1$ ve $-1 \\le \\cos(x) \\le 1$. Dolayısıyla $u_n = 2\\sin n - 3\\cos(n^2)$ için $|u_n| \\le 2(1) + 3(1) = 5$ olup dizi kesinlikle sınırlıdır.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Tanım 1.5 & Teorem 1.22: Monotonluk ve Monoton Limit Teoremi</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $(u_n)$ dizisinin monotonluğunu test etmek için iki standart yöntem kullanılır:</p>\n    <ol>\n      <li><strong>Fark İncelemesi :</strong> $u_{n+1} - u_n \\ge 0 \\implies (u_n)$ artandır (croissante). Negatifse azalandır (décroissante).</li>\n      <li><strong>Pozitif Terimlerde Oran Testi :</strong> $u_n > 0$ iken $\frac{u_{n+1}}{u_n} \\ge 1 \\implies$ artan; $\\le 1 \\implies$ azalan.</li>\n    </ol>\n    <div style=\"background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); padding: 10px 14px; border-radius: 4px; margin-top: 10px;\">\n      <strong>📌 Théorème de la Limite Monotone (Altın Kural) :</strong><br>\n      • Artan ve <strong>üstten sınırlı</strong> her dizi $\\mathbb{R}$'de bir $\\ell$ limitine yakınsar ($\\ell = \\sup \\{u_n\\}$).<br>\n      • Azalan ve <strong>alttan sınırlı</strong> her dizi $\\mathbb{R}$'de bir $\\ell$ limitine yakınsar ($\\ell = \\inf \\{u_n\\}$).\n    </div>\n  </div>\n</div>\n"
        },
        {
          "title": "2. Sıkıştırma Teoremi & Sabit Nokta (Point Fixe)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Kritik Teoremler</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Théorème des Gendarmes & Théorème du Point Fixe</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Teorem 1.17: Théorème des Deux Gendarmes (Sıkıştırma / Sandviç)</div>\n  <div class=\"theory-box-body\">\n    <p>Belirli bir basamaktan itibaren $v_n \\le u_n \\le w_n$ eşitsizliği sağlanıyorsa ve:</p>\n    $$\\lim_{n\\to+\\infty} v_n = \\lim_{n\\to+\\infty} w_n = \\ell \\implies \\lim_{n\\to+\\infty} u_n = \\ell$$\n    <p><strong>Sınav Taktiği:</strong> $n!$ faktöriyelli veya trigonometrik paydalı ifadelerde üst sınır geometrik diziye benzetilerek ($n! \\ge 6 \\cdot 4^{n-3}$) iki uçtan $0$'a sıkıştırılır.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Théorème du Point Fixe & Özyinelemeli Diziler ($u_{n+1} = f(u_n)$)</div>\n  <div class=\"theory-box-body\">\n    <p>Sınavlarda özyinelemeli dizi sorularını çözerken şu 3 aşamalı şablon izlenir:</p>\n    <ul>\n      <li><strong>1. Adım (Stabilité & Bornitude) :</strong> $f(I) \\subset I$ gösterilir. Tümevarımla $\forall n, u_n \\in I$ ispatlanır.</li>\n      <li><strong>2. Adım (Monotonie) :</strong> $u_{n+1} - u_n = f(u_n) - u_n$ farkının işareti $u_n \\in I$ aralık bilgisi kullanılarak incelenir.</li>\n      <li><strong>3. Adım (Point Fixe Denklemi) :</strong> Monoton ve sınırlı dizi yakınsar ($u_n \to L$). $f$ sürekli olduğundan $L = f(L)$ sabit nokta denklemi çözülür ve $I$ aralığındaki kök seçilir.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">Asimptotik Hiyerarşi (Croissances Comparées)</div>\n  <div class=\"theory-box-body\">\n    $$ \\ln n \\ll n^\\alpha \\ll a^n \\ll n! \\ll n^n \\quad (\\alpha > 0, \\; a > 1) $$\n    <p>Bu hiyerarşide sağdaki ifade soldakini sonsuzda ezer: $\\lim_{n\\to\\infty} \\frac{\\ln n}{n^\\alpha} = 0$, $\\lim_{n\\to\\infty} \\frac{n^\\alpha}{a^n} = 0$, $\\lim_{n\\to\\infty} \\frac{a^n}{n!} = 0$.</p>\n  </div>\n</div>\n"
        },
        {
          "title": "3. Alt Diziler & Cauchy Dizisi (Critère de Cauchy)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">İleri Düzey Dizi Analizi</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Sous-suites, Valeurs d'Adhérence & Suites de Cauchy</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Önerme 1.26 & 1.27: Alt Diziler ile Iraksaklık İspatı</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer bir $(u_n)$ dizisi bir $\\ell$ limitine yakınsıyorsa, onun <strong>her alt dizisi</strong> $(u_{n_k})$ de aynı $\\ell$ limitine yakınsar.</p>\n    <p><strong>Iraksaklık Kriteri (Test des sous-suites) :</strong> Eğer bir dizinin farklı limitlere yakınsayan en az iki alt dizisi bulunursa (örneğin çift indisler $u_{2k} \\to 1$ ve tek indisler $u_{2k+1} \\to -1$), o dizi <strong>kesinlikle ıraksaktır</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Tanım 1.30 & Teorem 1.31: Cauchy Dizisi ve $\\mathbb{R}$'nin Tamlığı</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $(u_n)$ reel dizisine <strong>Cauchy dizisi</strong> denir $\\iff$ indisi büyüdükçe terimler birbirine sonsuz yaklaşır:</p>\n    $$ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall m, n \\ge N \\implies |u_n - u_m| < \\varepsilon $$\n    <p><strong>Critère de Cauchy (Tamlık) :</strong> $\\mathbb{R}$ tam bir metrik uzay olduğundan (complétude de $\\mathbb{R}$), bir dizinin yakınsak olması ile Cauchy dizisi olması <strong>tamamen denktir</strong>:</p>\n    $$ (u_n) \\text{ converge dans } \\mathbb{R} \\iff (u_n) \\text{ est une suite de Cauchy.} $$\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Dizilerin Tanımı, Sınırlılık & Monotonluk</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 0 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Dizilerde Sınırlılık, Monotonluk ve Limit Kavramı</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Tanım 1.1 & 1.2: Dizi ve Sınırlılık (Suites Bornées)</div>\n  <div class=\"theory-box-body\">\n    <p>Reel sayı dizisi $(u_n)_{n \\ge n_0}$, doğal sayılardan $\\mathbb{R}$'ye tanımlı bir fonksiyondur ($n \\mapsto u_n$).</p>\n    <ul>\n      <li><strong>Üstten Sınırlı (Majorée) :</strong> $\\exists M \\in \\mathbb{R}, \\; \forall n, \\; u_n \\le M$.</li>\n      <li><strong>Alttan Sınırlı (Minorée) :</strong> $\\exists m \\in \\mathbb{R}, \\; \forall n, \\; u_n \\ge m$.</li>\n      <li><strong>Sınırlı (Bornée) :</strong> Dizi hem alttan hem üstten sınırlıdır $\\iff \\exists K > 0, \\; \forall n, \\; |u_n| \\le K$.</li>\n    </ul>\n    <p><em>Örnek:</em> Trigonometrik ifadeler her zaman $[-1, 1]$ aralığında sınırlıdır: $-1 \\le \\sin(x) \\le 1$ ve $-1 \\le \\cos(x) \\le 1$. Dolayısıyla $u_n = 2\\sin n - 3\\cos(n^2)$ için $|u_n| \\le 2(1) + 3(1) = 5$ olup dizi kesinlikle sınırlıdır.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Tanım 1.5 & Teorem 1.22: Monotonluk ve Monoton Limit Teoremi</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $(u_n)$ dizisinin monotonluğunu test etmek için iki standart yöntem kullanılır:</p>\n    <ol>\n      <li><strong>Fark İncelemesi :</strong> $u_{n+1} - u_n \\ge 0 \\implies (u_n)$ artandır (croissante). Negatifse azalandır (décroissante).</li>\n      <li><strong>Pozitif Terimlerde Oran Testi :</strong> $u_n > 0$ iken $\frac{u_{n+1}}{u_n} \\ge 1 \\implies$ artan; $\\le 1 \\implies$ azalan.</li>\n    </ol>\n    <div style=\"background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); padding: 10px 14px; border-radius: 4px; margin-top: 10px;\">\n      <strong>📌 Théorème de la Limite Monotone (Altın Kural) :</strong><br>\n      • Artan ve <strong>üstten sınırlı</strong> her dizi $\\mathbb{R}$'de bir $\\ell$ limitine yakınsar ($\\ell = \\sup \\{u_n\\}$).<br>\n      • Azalan ve <strong>alttan sınırlı</strong> her dizi $\\mathbb{R}$'de bir $\\ell$ limitine yakınsar ($\\ell = \\inf \\{u_n\\}$).\n    </div>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. Sıkıştırma Teoremi & Sabit Nokta (Point Fixe)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Kritik Teoremler</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Théorème des Gendarmes & Théorème du Point Fixe</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Teorem 1.17: Théorème des Deux Gendarmes (Sıkıştırma / Sandviç)</div>\n  <div class=\"theory-box-body\">\n    <p>Belirli bir basamaktan itibaren $v_n \\le u_n \\le w_n$ eşitsizliği sağlanıyorsa ve:</p>\n    $$\\lim_{n\\to+\\infty} v_n = \\lim_{n\\to+\\infty} w_n = \\ell \\implies \\lim_{n\\to+\\infty} u_n = \\ell$$\n    <p><strong>Sınav Taktiği:</strong> $n!$ faktöriyelli veya trigonometrik paydalı ifadelerde üst sınır geometrik diziye benzetilerek ($n! \\ge 6 \\cdot 4^{n-3}$) iki uçtan $0$'a sıkıştırılır.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Théorème du Point Fixe & Özyinelemeli Diziler ($u_{n+1} = f(u_n)$)</div>\n  <div class=\"theory-box-body\">\n    <p>Sınavlarda özyinelemeli dizi sorularını çözerken şu 3 aşamalı şablon izlenir:</p>\n    <ul>\n      <li><strong>1. Adım (Stabilité & Bornitude) :</strong> $f(I) \\subset I$ gösterilir. Tümevarımla $\forall n, u_n \\in I$ ispatlanır.</li>\n      <li><strong>2. Adım (Monotonie) :</strong> $u_{n+1} - u_n = f(u_n) - u_n$ farkının işareti $u_n \\in I$ aralık bilgisi kullanılarak incelenir.</li>\n      <li><strong>3. Adım (Point Fixe Denklemi) :</strong> Monoton ve sınırlı dizi yakınsar ($u_n \to L$). $f$ sürekli olduğundan $L = f(L)$ sabit nokta denklemi çözülür ve $I$ aralığındaki kök seçilir.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">Asimptotik Hiyerarşi (Croissances Comparées)</div>\n  <div class=\"theory-box-body\">\n    $$ \\ln n \\ll n^\\alpha \\ll a^n \\ll n! \\ll n^n \\quad (\\alpha > 0, \\; a > 1) $$\n    <p>Bu hiyerarşide sağdaki ifade soldakini sonsuzda ezer: $\\lim_{n\\to\\infty} \\frac{\\ln n}{n^\\alpha} = 0$, $\\lim_{n\\to\\infty} \\frac{n^\\alpha}{a^n} = 0$, $\\lim_{n\\to\\infty} \\frac{a^n}{n!} = 0$.</p>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">3. Alt Diziler & Cauchy Dizisi (Critère de Cauchy)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">İleri Düzey Dizi Analizi</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Sous-suites, Valeurs d'Adhérence & Suites de Cauchy</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Önerme 1.26 & 1.27: Alt Diziler ile Iraksaklık İspatı</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer bir $(u_n)$ dizisi bir $\\ell$ limitine yakınsıyorsa, onun <strong>her alt dizisi</strong> $(u_{n_k})$ de aynı $\\ell$ limitine yakınsar.</p>\n    <p><strong>Iraksaklık Kriteri (Test des sous-suites) :</strong> Eğer bir dizinin farklı limitlere yakınsayan en az iki alt dizisi bulunursa (örneğin çift indisler $u_{2k} \\to 1$ ve tek indisler $u_{2k+1} \\to -1$), o dizi <strong>kesinlikle ıraksaktır</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Tanım 1.30 & Teorem 1.31: Cauchy Dizisi ve $\\mathbb{R}$'nin Tamlığı</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $(u_n)$ reel dizisine <strong>Cauchy dizisi</strong> denir $\\iff$ indisi büyüdükçe terimler birbirine sonsuz yaklaşır:</p>\n    $$ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall m, n \\ge N \\implies |u_n - u_m| < \\varepsilon $$\n    <p><strong>Critère de Cauchy (Tamlık) :</strong> $\\mathbb{R}$ tam bir metrik uzay olduğundan (complétude de $\\mathbb{R}$), bir dizinin yakınsak olması ile Cauchy dizisi olması <strong>tamamen denktir</strong>:</p>\n    $$ (u_n) \\text{ converge dans } \\mathbb{R} \\iff (u_n) \\text{ est une suite de Cauchy.} $$\n  </div>\n</div>\n</div>"
    },
    "seriler_mod2": {
      "id": "seriler_mod2",
      "title": "Modül 2: TD 1 - Premières Séries Numériques (Seriler ve Kısmi Toplamlar)",
      "shortTitle": "TD-1: Temel Seriler & Toplam",
      "badge": "TD 1",
      "description": "Galatasaray Üniversitesi MAT201 TD 1 çalışma föyündeki 9 sorunun eksiksiz çözümü: İndis kaydırma, geometrik seri ispatı, u_n → 0 testi, devirli ondalıklar, teleskopik çift kök, Bertrand serileri ve Koch kar tanesi.",
      "exercises": [
        {
          "id": "s2_ex1",
          "name": "TD 1 • Ex 1 : Somme des Impairs & Changement d'Indice",
          "subtitle": "∑(2k-1) = n² ve İndis Kaydırma Metodu",
          "tag": "TD 1",
          "concepts": [
            "series_telescopiques_absolue",
            "theoreme_gendarmes"
          ],
          "enonce": "<strong>TD 1 • Exercice 1 :</strong><br>\n(a) Calculer pour tout $n \\ge 1$ la somme des $n$ premiers entiers impairs :\n$$ S_n = \\sum_{k=1}^n (2k - 1) $$\n(b) Effectuer un changement d'indice dans la somme :\n$$ \\sum_{k=0}^n \\frac{1}{k+2} $$\nafin de l'écrire sous la forme d'une somme dont l'indice commence à $2$.r",
          "hint": "Toplam sembolünün doğrusallığını (linéarité) kullan: $\\sum (2k-1) = 2\\sum k - \\sum 1$. İndis kaydırmada $j = k+2$ dönüşümü yap.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (a) — Calcul de la Somme des Impairs",
              "content": "<p>Par linéarité de l'opérateur somme $\\sum$ :\n$$ S_n = \\sum_{k=1}^n (2k - 1) = 2 \\sum_{k=1}^n k - \\sum_{k=1}^n 1 $$\nUtilisons la formule classique de la somme des $n$ premiers entiers naturels (somme arithmétique de Gauss) :\n$$ \\sum_{k=1}^n k = \\frac{n(n+1)}{2} \\quad \\text{et} \\quad \\sum_{k=1}^n 1 = n $$\nSubstituons ces expressions dans $S_n$ :\n$$ S_n = 2 \\times \\frac{n(n+1)}{2} - n = n(n+1) - n = n^2 + n - n = n^2 $$\nLa somme des $n$ premiers entiers impairs est donc exactement égale à $n^2$.<br>\n<em>Vérification pour $n=3$ :</em> $1 + 3 + 5 = 9 = 3^2$. Formule confirmée.r"
            },
            {
              "title": "Étape 2 : Partie (b) — Changement d'Indice Rigoureux",
              "content": "<p>Considérons la somme :\n$$ A = \\sum_{k=0}^n \\frac{1}{k+2} $$\nPosons le changement d'indice $j = k+2$.\nDéterminons les nouvelles bornes de sommation :\n<ul>\n  <li>Lorsque la borne inférieure est $k = 0$ : $j = 0 + 2 = 2$.</li>\n  <li>Lorsque la borne supérieure est $k = n$ : $j = n + 2$.</li>\n</ul>\nDe plus, le terme général devient simplement $\\frac{1}{j}$.\nAinsi, en réécrivant la somme avec le nouvel indice muet $j$ :\n$$ \\sum_{k=0}^n \\frac{1}{k+2} = \\sum_{j=2}^{n+2} \\frac{1}{j} $$\nPuisque l'indice de sommation est une variable muette, on peut également le noter $k$ :\n$$ \\sum_{k=2}^{n+2} \\frac{1}{k} \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s2_ex2",
          "name": "TD 1 • Ex 2 : Série Géométrique ∑ qⁿ (Preuve Complète)",
          "subtitle": "Geometrik Seri Yakınsaklık Şartı (|q| < 1) ve Toplam Formülü",
          "tag": "TD 1",
          "concepts": [
            "series_riemann_bertrand",
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 2 :</strong><br>\nSoit $q \\in \\mathbb{R} \\setminus \\{1\\}$.<br>\n(1) Rappeler et démontrer l'expression de la somme partielle $S_N = \\sum_{n=0}^N q^n$.<br>\n(2) Montrer que la série géométrique $\\sum_{n=0}^{+\\infty} q^n$ converge si et seulement si $|q| < 1$.<br>\n(3) Dans ce cas, calculer sa somme totale $S = \\sum_{n=0}^{+\\infty} q^n$.r",
          "hint": "$(1-q)S_N = 1 - q^{N+1}$ cebirsel özdeşliğini kur. $N \to +\\infty$ limitinde $q^{N+1}$ ifadesinin ne zaman sıfıra gittiğini incele.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Calcul Algébrique de la Somme Partielle S_N",
              "content": "<p>Soit $q \\in \\mathbb{R} \\setminus \\{1\\}$. Écrivons la somme partielle $S_N$ :\n$$ S_N = \\sum_{n=0}^N q^n = 1 + q + q^2 + \\dots + q^N $$\nMultiplions les deux membres par $q$ :\n$$ q S_N = q + q^2 + q^3 + \\dots + q^{N+1} $$\nSoustrayons membre à membre $S_N - q S_N$ :\n$$ S_N - q S_N = (1 + q + \\dots + q^N) - (q + q^2 + \\dots + q^{N+1}) = 1 - q^{N+1} $$\nFactorisons par $S_N$ : $(1 - q) S_N = 1 - q^{N+1}$.\nPuisque $q \\ne 1$, nous pouvons diviser par $1 - q$ :\n$$ S_N = \\frac{1 - q^{N+1}}{1 - q} $$r"
            },
            {
              "title": "Étape 2 : Étude de la Limite du Reste q^{N+1}",
              "content": "<p>La série géométrique converge si et seulement si la suite des sommes partielles $(S_N)_{N \\ge 0}$ admet une limite finie dans $\\mathbb{R}$ quand $N \\to +\\infty$.\nDans l'expression de $S_N$, seul le terme $q^{N+1}$ dépend de $N$ :\n<ul>\n  <li><strong>Si $|q| < 1$ :</strong> $\\lim_{N \\to +\\infty} q^{N+1} = 0$. Donc $S_N \\xrightarrow[N \\to +\\infty]{} \\frac{1 - 0}{1 - q} = \\frac{1}{1 - q}$. La série converge.</li>\n  <li><strong>Si $q > 1$ :</strong> $\\lim_{N \\to +\\infty} q^{N+1} = +\\infty$. Donc $S_N \\to +\\infty$. La série diverge.</li>\n  <li><strong>Si $q \\le -1$ :</strong> la suite $q^{N+1}$ oscille sans limite (ou diverge en valeur absolue). $S_N$ n'admet aucune limite. La série diverge.</li>\n  <li><strong>Si $q = 1$ :</strong> $S_N = \\sum_{n=0}^N 1 = N + 1 \\to +\\infty$. La série diverge.</li>\n</ul>\nConclusion : La série géométrique converge <strong>si et seulement si $|q| < 1$</strong>.r"
            },
            {
              "title": "Étape 3 : Calcul de la Somme Totale",
              "content": "<p>Lorsque $|q| < 1$, la somme de la série est donnée par la limite finie :\n$$ S = \\sum_{n=0}^{+\\infty} q^n = \\lim_{N \\to +\\infty} S_N = \\frac{1}{1 - q} \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s2_ex3",
          "name": "TD 1 • Ex 3 : Condition Nécessaire de Convergence (u_n → 0)",
          "subtitle": "Genel Terim Limiti Testi ve Harmonik Karşıt Örnek",
          "tag": "TD 1",
          "concepts": [
            "series_riemann_bertrand",
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 3 :</strong><br>\nPour chacune des séries suivantes, étudier la limite du terme général $u_n$ quand $n \\to +\\infty$ et préciser ce que l'on peut en déduire concernant la convergence de la série :\n$$ (1) \\quad \\sum_{n=1}^{+\\infty} \\frac{n+2}{n+1} \\qquad (2) \\quad \\sum_{n=1}^{+\\infty} \\cos\\left(\\frac{1}{n}\\right) \\qquad (3) \\quad \\sum_{n=1}^{+\\infty} \\frac{1}{n^2} $$\n<strong>Question fondamentale :</strong> La condition $u_n \\to 0$ est-elle suffisante pour assurer la convergence de la série $\\sum u_n$ ? Donner un contre-exemple explicite.r",
          "hint": "Bir serinin yakınsak olabilmesi için İLK ŞART genel terimin sıfıra gitmesidir ($u_n \\to 0$). Eğer $\\lim u_n \\ne 0$ ise seri DOĞRUDAN IRAKSAR (Divergence grossière). $u_n \\to 0$ ise test sonuç vermez (harmonik seri örneği).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Analyse des Séries (1) et (2) — Divergence Grossière",
              "content": "<p><strong>(1) Série $\\sum_{n=1}^{+\\infty} \\frac{n+2}{n+1}$ :</strong>\nCalculons la limite du terme général :\n$$ \\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\frac{n+2}{n+1} = \\lim_{n \\to +\\infty} \\frac{1 + \\frac{2}{n}}{1 + \\frac{1}{n}} = 1 $$\nPuisque $\\lim_{n \\to +\\infty} u_n = 1 \\ne 0$, la condition nécessaire de convergence n'est pas vérifiée.\nLa série $\\sum_{n=1}^{+\\infty} \\frac{n+2}{n+1}$ <strong>diverge grossièrement (divergence triviale)</strong>.\n<p><strong>(2) Série $\\sum_{n=1}^{+\\infty} \\cos\\left(\\frac{1}{n}\\right)$ :</strong>\nQuand $n \\to +\\infty$, $\\frac{1}{n} \\to 0$. Par continuité de la fonction cosinus en 0 :\n$$ \\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\cos\\left(\\frac{1}{n}\\right) = \\cos(0) = 1 $$\nComme la limite vaut $1 \\ne 0$, la série $\\sum_{n=1}^{+\\infty} \\cos\\left(\\frac{1}{n}\\right)$ <strong>diverge grossièrement</strong>.r"
            },
            {
              "title": "Étape 2 : Analyse de la Série (3) — Condition Nécessaire Satisfaite",
              "content": "<p><strong>(3) Série $\\sum_{n=1}^{+\\infty} \\frac{1}{n^2}$ :</strong>\nCalculons la limite du terme général :\n$$ \\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\frac{1}{n^2} = 0 $$\nLe terme général tend vers 0 : la condition nécessaire est satisfaite.<br>\nAttention : cela ne garantit pas la convergence à ce stade ! Cependant, d'après la règle des séries de Riemann $\\sum \\frac{1}{n^\\alpha}$, ici $\\alpha = 2 > 1$, donc la série <strong>converge</strong>.r"
            },
            {
              "title": "Étape 3 : Question Fondamentale & Contre-Exemple Harmonique",
              "content": "<p><strong>Non, la condition $u_n \\to 0$ n'est PAS suffisante.</strong>\nLe contre-exemple universel est la <strong>série harmonique</strong> :\n$$ \\sum_{n=1}^{+\\infty} \\frac{1}{n} $$\nSon terme général est $u_n = \\frac{1}{n} \\xrightarrow[n \\to +\\infty]{} 0$.\nPourtant, la série diverge vers $+\\infty$ :\n$$ S_{2^k} \\ge 1 + \\frac{k}{2} \\xrightarrow[k \\to +\\infty]{} +\\infty $$\n<div class=\"theory-box tip\"><div class=\"theory-box-title\">Meral Hoca Sınav Kuralı</div><div class=\"theory-box-body\">\n« $u_n \\to 0$ est une condition NÉCESSAIRE mais NON SUFFISANTE. Si $u_n \\not\\to 0$, on conclut immédiatement à la divergence grossière. Si $u_n \\to 0$, on NE PEUT RIEN CONCLURE : il faut utiliser un critère (Riemann, d'Alembert, Cauchy, Leibniz...). »\n</div></div>r"
            }
          ]
        },
        {
          "id": "s2_ex4",
          "name": "TD 1 • Ex 4 : Calculs Explicites de Séries Géométriques",
          "subtitle": "∑(3/4)ⁿ, ∑(-1/3)ⁿ, ∑(-5/4)ⁿ Yakınsaklık ve Toplam Hesabı",
          "tag": "TD 1",
          "concepts": [
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 4 :</strong><br>\nDéterminer la nature des séries suivantes et calculer leur somme lorsqu'elles convergent :\n$$ (1) \\quad \\sum_{n=0}^{+\\infty} \\left(\\frac{3}{4}\\right)^n \\qquad (2) \\quad \\sum_{n=0}^{+\\infty} \\left(-\\frac{1}{3}\\right)^n \\qquad (3) \\quad \\sum_{n=0}^{+\\infty} \\left(-\\frac{5}{4}\\right)^n $$r",
          "hint": "Her seride ortak çarpan $q$'yu tespit et. $|q| < 1$ ise seri yakınsar ve toplam $S = \\frac{1}{1-q}$ olur. $|q| \\ge 1$ ise genel terim sıfıra gitmediği için seri ıraksar.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Calcul de la Série (1)",
              "content": "<p>Il s'agit d'une série géométrique de terme général $u_n = q^n$ avec $q = \\frac{3}{4}$.\nCalculons la valeur absolue de la raison :\n$$ |q| = \\left|\\frac{3}{4}\\right| = \\frac{3}{4} < 1 $$\nPuisque $|q| < 1$, la série géométrique converge.\nSa somme est donnée par la formule $S = \\frac{1}{1-q}$ :\n$$ S = \\sum_{n=0}^{+\\infty} \\left(\\frac{3}{4}\\right)^n = \\frac{1}{1 - \\frac{3}{4}} = \\frac{1}{\\frac{1}{4}} = 4 $$r"
            },
            {
              "title": "Étape 2 : Calcul de la Série (2)",
              "content": "<p>C'est une série géométrique de raison $q = -\\frac{1}{3}$.\nVérifions la condition de convergence :\n$$ |q| = \\left|-\\frac{1}{3}\\right| = \\frac{1}{3} < 1 $$\nComme $|q| < 1$, la série converge.\nCalculons sa somme :\n$$ S = \\sum_{n=0}^{+\\infty} \\left(-\\frac{1}{3}\\right)^n = \\frac{1}{1 - \\left(-\\frac{1}{3}\\right)} = \\frac{1}{1 + \\frac{1}{3}} = \\frac{1}{\\frac{4}{3}} = \\frac{3}{4} $$r"
            },
            {
              "title": "Étape 3 : Analyse de la Série (3)",
              "content": "<p>C'est une série géométrique de raison $q = -\\frac{5}{4}$.\nCalculons la valeur absolue de $q$ :\n$$ |q| = \\left|-\\frac{5}{4}\\right| = \\frac{5}{4} = 1.25 \\ge 1 $$\nPuisque $|q| \\ge 1$, le terme général ne tend pas vers 0 :\n$$ |u_n| = \\left(\\frac{5}{4}\\right)^n \\xrightarrow[n \\to +\\infty]{} +\\infty \\implies \\lim_{n \\to +\\infty} u_n \\ne 0 $$\nLa série $\\sum_{n=0}^{+\\infty} \\left(-\\frac{5}{4}\\right)^n$ <strong>diverge grossièrement</strong>. ■r"
            }
          ]
        },
        {
          "id": "s2_ex5",
          "name": "TD 1 • Ex 5 : Écritures Décimales Périodiques (0.333... & 0.999...)",
          "subtitle": "Devirli Ondalık Sayıların Geometrik Seri Temsili",
          "tag": "TD 1",
          "concepts": [
            "series_riemann_bertrand",
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 5 :</strong><br>\n(1) Écrire le nombre décimal périodique $0.3333\\dots$ sous la forme d'une série géométrique. Montrer que $0.33\\dots = \\frac{1}{3}$.<br>\n(2) En utilisant la même méthode, déterminer la valeur exacte de $0.999999\\dots$.r",
          "hint": "$0.333\\dots = \\frac{3}{10} + \\frac{3}{100} + \\dots = \\frac{3}{10} \\sum_{n=0}^\\infty (1/10)^n$. Geometrik seri toplamını hesapla.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Preuve que 0.333... = 1/3",
              "content": "<p>Décomposons le nombre $0.3333\\dots$ selon la numération décimale positionnelle :\n$$ 0.3333\\dots = \\frac{3}{10} + \\frac{3}{100} + \\frac{3}{1000} + \\dots = \\sum_{n=1}^{+\\infty} \\frac{3}{10^n} $$\nFactorisons par le premier terme $\\frac{3}{10}$ :\n$$ 0.3333\\dots = \\frac{3}{10} \\sum_{k=0}^{+\\infty} \\left(\\frac{1}{10}\\right)^k $$\nC'est une série géométrique de raison $q = \\frac{1}{10}$. Comme $|q| = 0.1 < 1$, elle converge et sa somme vaut :\n$$ \\sum_{k=0}^{+\\infty} \\left(\\frac{1}{10}\\right)^k = \\frac{1}{1 - \\frac{1}{10}} = \\frac{1}{\\frac{9}{10}} = \\frac{10}{9} $$\nMultiplions par $\\frac{3}{10}$ :\n$$ 0.3333\\dots = \\frac{3}{10} \\times \\frac{10}{9} = \\frac{3}{9} = \\frac{1}{3} \\quad \\blacksquare $$r"
            },
            {
              "title": "Étape 2 : Partie (2) — Valeur Exacte de 0.999999...",
              "content": "<p>Appliquons exactement la même démarche pour $0.999999\\dots$ :\n$$ 0.999999\\dots = \\sum_{n=1}^{+\\infty} \\frac{9}{10^n} = \\frac{9}{10} \\sum_{k=0}^{+\\infty} \\left(\\frac{1}{10}\\right)^k $$\nEn utilisant la somme de la série géométrique de raison $q = 1/10$ calculée à l'étape 1 :\n$$ 0.999999\\dots = \\frac{9}{10} \\times \\frac{10}{9} = \\frac{9}{9} = 1 $$\nCe résultat fondamental montre qu'en analyse réelle, $0.999999\\dots$ et $1$ sont deux représentations décimales du <strong>même nombre réel</strong>. ■r"
            }
          ]
        },
        {
          "id": "s2_ex6",
          "name": "TD 1 • Ex 6 : Série Télescopique à Double Radical",
          "subtitle": "Kısmi Toplamlar Sadeleşmesi ve Limit (∑ (1/√(n-1) - 2/√n + 1/√(n+1)))",
          "tag": "TD 1",
          "concepts": [
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 6 :</strong><br>\nOn considère la série :\n$$ \\sum_{n=2}^{+\\infty} \\left( \\frac{1}{\\sqrt{n-1}} - \\frac{2}{\\sqrt{n}} + \\frac{1}{\\sqrt{n+1}} \\right) $$\n(1) Décomposer le terme général en une différence de deux termes consécutifs d'une suite auxiliaire.<br>\n(2) Calculer explicitement la somme partielle $S_N = \\sum_{n=2}^N u_n$ pour tout $N \\ge 2$.<br>\n(3) En déduire que la série converge et calculer sa somme totale.r",
          "hint": "$-2/\\sqrt{n}$ terimini $-1/\\sqrt{n} - 1/\\sqrt{n}$ olarak ikiye ayır! $v_n = \\frac{1}{\\sqrt{n-1}} - \\frac{1}{\\sqrt{n}}$ tanımıyla teleskopik sadeleşme elde et.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Décomposition Télescopique du Terme Général",
              "content": "<p>Scindons le terme médian $-\\frac{2}{\\sqrt{n}}$ en deux termes : $-\\frac{1}{\\sqrt{n}} - \\frac{1}{\\sqrt{n}}$.\nLe terme général $u_n$ s'écrit alors :\n$$ u_n = \\left(\\frac{1}{\\sqrt{n-1}} - \\frac{1}{\\sqrt{n}}\\right) - \\left(\\frac{1}{\\sqrt{n}} - \\frac{1}{\\sqrt{n+1}}\\right) $$\nPosons la suite auxiliaire $v_n = \\frac{1}{\\sqrt{n-1}} - \\frac{1}{\\sqrt{n}}$ pour tout $n \\ge 2$.\nOn remarque que $v_{n+1} = \\frac{1}{\\sqrt{n}} - \\frac{1}{\\sqrt{n+1}}$.\nPar conséquent :\n$$ u_n = v_n - v_{n+1} $$\nC'est une <strong>somme télescopique parfaite</strong> !r"
            },
            {
              "title": "Étape 2 : Calcul Explicite de la Somme Partielle S_N",
              "content": "<p>Calculons la somme partielle $S_N$ pour $N \\ge 2$ :\n$$ S_N = \\sum_{n=2}^N u_n = \\sum_{n=2}^N (v_n - v_{n+1}) = (v_2 - v_3) + (v_3 - v_4) + \\dots + (v_N - v_{N+1}) $$\nTous les termes intermédiaires s'annulent deux à deux (effet domino). Il ne reste que le premier et le dernier terme :\n$$ S_N = v_2 - v_{N+1} $$\nRemplaçons avec la définition de la suite $v$ :\n$$ v_2 = \\frac{1}{\\sqrt{2-1}} - \\frac{1}{\\sqrt{2}} = 1 - \\frac{1}{\\sqrt{2}} $$\n$$ v_{N+1} = \\frac{1}{\\sqrt{N}} - \\frac{1}{\\sqrt{N+1}} $$\nAinsi, pour tout $N \\ge 2$ :\n$$ S_N = 1 - \\frac{1}{\\sqrt{2}} - \\frac{1}{\\sqrt{N}} + \\frac{1}{\\sqrt{N+1}} $$r"
            },
            {
              "title": "Étape 3 : Passage à la Limite et Somme de la Série",
              "content": "<p>Calculons la limite de $S_N$ quand $N \\to +\\infty$ :\n$$ \\lim_{N \\to +\\infty} \\frac{1}{\\sqrt{N}} = 0 \\quad \\text{et} \\quad \\lim_{N \\to +\\infty} \\frac{1}{\\sqrt{N+1}} = 0 $$\nPar conséquent :\n$$ \\lim_{N \\to +\\infty} S_N = 1 - \\frac{1}{\\sqrt{2}} - 0 + 0 = 1 - \\frac{\\sqrt{2}}{2} $$\nLa suite des sommes partielles admet une limite finie.\nLa série converge donc, et sa somme vaut :\n$$ \\sum_{n=2}^{+\\infty} \\left( \\frac{1}{\\sqrt{n-1}} - \\frac{2}{\\sqrt{n}} + \\frac{1}{\\sqrt{n+1}} \\right) = 1 - \\frac{\\sqrt{2}}{2} \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s2_ex7",
          "name": "TD 1 • Ex 7 : Combinaison Linéaire de Séries Géométriques",
          "subtitle": "∑ (3 / 2ⁿ + 5 (-2/7)ⁿ) Lineerliği ve Toplamı",
          "tag": "TD 1",
          "concepts": [
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 7 :</strong><br>\nOn considère la série :\n$$ \\sum_{n=0}^{+\\infty} \\left( \\frac{3}{2^n} + 5 \\left(-\\frac{2}{7}\\right)^n \\right) $$\n(1) Justifier que la série converge en utilisant la linéarité des séries convergentes.<br>\n(2) Calculer sa somme exacte sous forme de fraction irréductible.r",
          "hint": "Seriyi iki ayrı geometrik serinin toplamı olarak yaz: $3 \\sum (1/2)^n + 5 \\sum (-2/7)^n$. İki serinin ortak çarpanları mutlak değerce 1'den küçüktür.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Justification de la Convergence par Linéarité",
              "content": "<p>Écrivons le terme général comme la combinaison linéaire de deux termes géométriques :\n$$ u_n = 3 \\times \\left(\\frac{1}{2}\\right)^n + 5 \\times \\left(-\\frac{2}{7}\\right)^n $$\nÉtudions la nature des deux séries géométriques composantes :\n<ul>\n  <li>$\\sum_{n=0}^{+\\infty} \\left(\\frac{1}{2}\\right)^n$ est une série géométrique de raison $q_1 = \\frac{1}{2}$. Comme $|q_1| = \\frac{1}{2} < 1$, elle converge.</li>\n  <li>$\\sum_{n=0}^{+\\infty} \\left(-\\frac{2}{7}\\right)^n$ est une série géométrique de raison $q_2 = -\\frac{2}{7}$. Comme $|q_2| = \\frac{2}{7} < 1$, elle converge.</li>\n</ul>\nPuisque deux séries convergent, toute combinaison linéaire de ces séries converge également (linéarité de l'espace des séries convergentes).\nLa série $\\sum u_n$ est donc <strong>convergente</strong>.r"
            },
            {
              "title": "Étape 2 : Calcul Explicite de la Somme",
              "content": "<p>Par linéarité de la somme :\n$$ S = 3 \\sum_{n=0}^{+\\infty} \\left(\\frac{1}{2}\\right)^n + 5 \\sum_{n=0}^{+\\infty} \\left(-\\frac{2}{7}\\right)^n $$\nAppliquons la formule de la somme géométrique $\\frac{1}{1-q}$ à chacune des deux sommes :\n$$ \\sum_{n=0}^{+\\infty} \\left(\\frac{1}{2}\\right)^n = \\frac{1}{1 - \\frac{1}{2}} = \\frac{1}{\\frac{1}{2}} = 2 $$\n$$ \\sum_{n=0}^{+\\infty} \\left(-\\frac{2}{7}\\right)^n = \\frac{1}{1 - \\left(-\\frac{2}{7}\\right)} = \\frac{1}{1 + \\frac{2}{7}} = \\frac{1}{\\frac{9}{7}} = \\frac{7}{9} $$\nSubstituons dans $S$ :\n$$ S = 3(2) + 5\\left(\\frac{7}{9}\\right) = 6 + \\frac{35}{9} = \\frac{54 + 35}{9} = \\frac{89}{9} \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s2_ex8",
          "name": "TD 1 • Ex 8 : Séries Logarithmiques de Bertrand",
          "subtitle": "∑ 1/(n ln n) ve ∑ 1/(n (ln n)²) Serilerinin Karşılaştırılması",
          "tag": "TD 1",
          "concepts": [
            "series_riemann_bertrand"
          ],
          "enonce": "<strong>TD 1 • Exercice 8 :</strong><br>\nOn considère les deux séries suivantes :\n$$ S_A = \\sum_{n=2}^{+\\infty} \\frac{1}{n \\ln n} \\qquad \\text{et} \\qquad S_B = \\sum_{n=2}^{+\\infty} \\frac{1}{n (\\ln n)^2} $$\n(1) Montrer que leurs termes généraux tendent vers 0 plus vite que $\\frac{1}{n}$.<br>\n(2) À l'aide du critère intégral (en posant la substitution $t = \\ln x$), étudier la nature de chacune de ces séries.r",
          "hint": "$\\frac{1/(n \\ln n)}{1/n} = \\frac{1}{\\ln n} \\to 0$. İntegral testinde $\\int \\frac{dx}{x (\\ln x)^\\alpha} = \\int \\frac{dt}{t^\\alpha}$ dönüşümü uygulanır. $\\alpha = 1$ için integral $\\ln(\\ln x) \\to \\infty$ (ıraksak), $\\alpha = 2$ için $-1/\\ln x \\to 0$ (yakınsak).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Vitesse de Convergence du Terme Général vers 0",
              "content": "<p>Comparons le terme général $u_n = \\frac{1}{n \\ln n}$ avec $\\frac{1}{n}$ :\n$$ \\frac{u_n}{\\frac{1}{n}} = \\frac{\\frac{1}{n \\ln n}}{\\frac{1}{n}} = \\frac{1}{\\ln n} $$\nComme $\\lim_{n \\to +\\infty} \\ln n = +\\infty$, nous avons :\n$$ \\lim_{n \\to +\\infty} \\frac{u_n}{1/n} = 0 \\implies u_n = o\\left(\\frac{1}{n}\\right) $$\nDe même pour la seconde série avec $v_n = \\frac{1}{n (\\ln n)^2}$ :\n$$ \\frac{v_n}{\\frac{1}{n}} = \\frac{1}{(\\ln n)^2} \\xrightarrow[n \\to +\\infty]{} 0 \\implies v_n = o\\left(\\frac{1}{n}\\right) $$\nLes termes généraux tendent donc tous deux vers 0 strictement plus vite que $\\frac{1}{n}$.r"
            },
            {
              "title": "Étape 2 : Nature de la Série S_A par Critère Intégral",
              "content": "<p>Pour $S_A$, considérons la fonction $f(x) = \\frac{1}{x \\ln x}$ définie sur $[2, +\\infty[$.\n$f$ est continue, positive et strictement décroissante.\nÉtudions l'intégrale impropre $\\int_2^{+\\infty} \\frac{dx}{x \\ln x}$ :\nPosons le changement de variable $t = \\ln x$, avec $dt = \\frac{dx}{x}$ :\n$$ \\int_2^M \\frac{dx}{x \\ln x} = \\int_{\\ln 2}^{\\ln M} \\frac{dt}{t} = [\\ln t]_{\\ln 2}^{\\ln M} = \\ln(\\ln M) - \\ln(\\ln 2) $$\nLorsque $M \\to +\\infty$, $\\ln(\\ln M) \\to +\\infty$.\nL'intégrale impropre diverge vers $+\\infty$.\nD'après le critère intégral, la série $S_A = \\sum_{n=2}^{+\\infty} \\frac{1}{n \\ln n}$ <strong>diverge</strong>.r"
            },
            {
              "title": "Étape 3 : Nature de la Série S_B par Critère Intégral",
              "content": "<p>Pour $S_B$, considérons $g(x) = \\frac{1}{x (\\ln x)^2}$ sur $[2, +\\infty[$.\nAvec le même changement de variable $t = \\ln x$, $dt = \\frac{dx}{x}$ :\n$$ \\int_2^M \\frac{dx}{x (\\ln x)^2} = \\int_{\\ln 2}^{\\ln M} \\frac{dt}{t^2} = \\left[ -\\frac{1}{t} \\right]_{\\ln 2}^{\\ln M} = \\frac{1}{\\ln 2} - \\frac{1}{\\ln M} $$\nLorsque $M \\to +\\infty$, $\\frac{1}{\\ln M} \\to 0$.\nL'intégrale impropre converge vers la valeur finie $\\frac{1}{\\ln 2}$.\nPar le critère intégral, la série $S_B = \\sum_{n=2}^{+\\infty} \\frac{1}{n (\\ln n)^2}$ <strong>converge</strong>. ■r"
            }
          ]
        },
        {
          "id": "s2_ex9",
          "name": "TD 1 • Ex 9 : Application Géométrique — Le Flocon de Koch",
          "subtitle": "Fraktal Kar Tanesi Alan Serisi (A_n ve Limit A = 8/5)",
          "tag": "TD 1",
          "concepts": [
            "series_riemann_bertrand",
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 1 • Exercice 9 :</strong><br>\nOn part d'un triangle équilatéral d'aire $1$ ($A_0 = 1$).<br>\nÀ la première étape, on ajoute 3 triangles équilatéraux, chacun d'aire $\\frac{1}{9}$.<br>\nÀ chaque nouvelle étape, le nombre de triangles ajoutés est multiplié par $4$ et l'aire de chacun de ces triangles est divisée par $9$. On note $A_n$ l'aire totale obtenue après $n$ étapes.<br>\n(1) Calculer $A_1$, $A_2$ et $A_3$.<br>\n(2) Montrer que pour tout $n \\ge 1$ :\n$$ A_n = 1 + \\frac{1}{3} \\sum_{k=0}^{n-1} \\left(\\frac{4}{9}\\right)^k $$\n(3) Calculer $\\lim_{n \\to +\\infty} A_n$.r",
          "hint": "$k$'ıncı adımda eklenen üçgen sayısı $3 \\cdot 4^{k-1}$, her birinin alanı $(1/9)^k$. Eklenen alan $3 \\cdot 4^{k-1} (1/9)^k = \\frac{1}{3} (4/9)^{k-1}$. Geometrik seri toplamından alan $8/5$ çıkar.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Calcul des Premiers Termes A₁, A₂ et A₃",
              "content": "<p>Initialement, $A_0 = 1$.\n<ul>\n  <li><strong>Étape 1 :</strong> On ajoute 3 triangles d'aire $\\frac{1}{9}$ :\n  $$ A_1 = A_0 + 3 \\times \\frac{1}{9} = 1 + \\frac{3}{9} = 1 + \\frac{1}{3} = \\frac{4}{3} \\approx 1.333 $$</li>\n  <li><strong>Étape 2 :</strong> On ajoute $3 \\times 4 = 12$ triangles d'aire $\\frac{1}{9^2} = \\frac{1}{81}$ :\n  $$ A_2 = A_1 + 12 \\times \\frac{1}{81} = \\frac{4}{3} + \\frac{4}{27} = \\frac{36 + 4}{27} = \\frac{40}{27} \\approx 1.481 $$</li>\n  <li><strong>Étape 3 :</strong> On ajoute $12 \\times 4 = 48$ triangles d'aire $\\frac{1}{9^3} = \\frac{1}{729}$ :\n  $$ A_3 = A_2 + 48 \\times \\frac{1}{729} = \\frac{40}{27} + \\frac{16}{243} = \\frac{360 + 16}{243} = \\frac{376}{243} \\approx 1.547 $$</li>\n</ul>r"
            },
            {
              "title": "Étape 2 : Établissement de la Formule Générale A_n",
              "content": "<p>À chaque étape $j \\ge 1$ :\n<ul>\n  <li>Nombre de triangles ajoutés : $N_j = 3 \\times 4^{j-1}$.</li>\n  <li>Aire d'un petit triangle : $a_j = \\left(\\frac{1}{9}\\right)^j$.</li>\n</ul>\nL'aire totale ajoutée à l'étape $j$ est :\n$$ \\Delta A_j = N_j \\times a_j = 3 \\times 4^{j-1} \\times \\frac{1}{9^j} = 3 \\times \\frac{4^{j-1}}{9 \\times 9^{j-1}} = \\frac{3}{9} \\times \\left(\\frac{4}{9}\\right)^{j-1} = \\frac{1}{3} \\left(\\frac{4}{9}\\right)^{j-1} $$\nL'aire totale après $n$ étapes est la somme cumulée :\n$$ A_n = A_0 + \\sum_{j=1}^n \\Delta A_j = 1 + \\sum_{j=1}^n \\frac{1}{3} \\left(\\frac{4}{9}\\right)^{j-1} $$\nEn effectuant le changement d'indice $k = j - 1$ :\n$$ A_n = 1 + \\frac{1}{3} \\sum_{k=0}^{n-1} \\left(\\frac{4}{9}\\right)^k \\quad \\blacksquare $$r"
            },
            {
              "title": "Étape 3 : Calcul de l'Aire Limite Quand n → +∞",
              "content": "<p>Puisque la raison géométrique $q = \\frac{4}{9}$ vérifie $|q| < 1$, la série géométrique converge :\n$$ \\lim_{n \\to +\\infty} \\sum_{k=0}^{n-1} \\left(\\frac{4}{9}\\right)^k = \\sum_{k=0}^{+\\infty} \\left(\\frac{4}{9}\\right)^k = \\frac{1}{1 - \\frac{4}{9}} = \\frac{1}{\\frac{5}{9}} = \\frac{9}{5} $$\nCalculons maintenant la limite de l'aire $A_n$ :\n$$ \\lim_{n \\to +\\infty} A_n = 1 + \\frac{1}{3} \\times \\frac{9}{5} = 1 + \\frac{3}{5} = \\frac{8}{5} = 1.6 $$\n<em>Interprétation fractale :</em> Le flocon de Koch a un périmètre infini ($P_n \\to +\\infty$), mais il enferme une aire finie égale à $\\frac{8}{5} = 1.6$ fois l'aire du triangle initial ! ■r"
            }
          ]
        }
      ],
      "breadcrumb": "MAT201 > Modül 2 (TD 1) > Seriler & Kısmi Toplamlar",
      "concepts": [
        "series_telescopiques_absolue",
        "series_riemann_bertrand"
      ],
      "theoryPages": [
        {
          "title": "1. Seri Tanımı & Zorunlu Şart (Divergence Grossière)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 1 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Sayısal Seriler, Kısmi Toplamlar ve Genel Terim Testi</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Tanım: Sayısal Seri ve Kısmi Toplamlar Dizisi ($S_N$)</div>\n  <div class=\"theory-box-body\">\n    <p>$(u_n)_{n\\ge 0}$ bir reel sayı dizisi olsun. $\\sum_{n=0}^{+\\infty} u_n$ serisinin yakınsaklığı, <strong>kısmi toplamlar dizisi</strong> $S_N = \\sum_{n=0}^N u_n$ üzerinden tanımlanır:</p>\n    $$ \\sum_{n=0}^{+\\infty} u_n = \\lim_{N\\to+\\infty} S_N = \\lim_{N\\to+\\infty} \\sum_{n=0}^N u_n $$\n    <p>Eğer bu limit sonlu bir $S \\in \\mathbb{R}$ sayısı ise seri <strong>yakınsaktır (convergente)</strong> ve toplamı $S$'dir. Limit sonsuzsa veya yoksa seri <strong>ıraksaktır (divergente)</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">0. REFLEKS: Zorunlu Şart (Condition Nécessaire / Divergence Grossière)</div>\n  <div class=\"theory-box-body\">\n    $$ \\sum u_n \\text{ converge} \\implies \\lim_{n\\to+\\infty} u_n = 0 $$\n    <p><strong>Karşıt Ters (Contraposée) :</strong> Genel terim $0$'a gitmiyorsa seri <strong>DOĞRUDAN IRAKSAKTIR</strong>:</p>\n    $$ \\lim_{n\\to+\\infty} u_n \\neq 0 \\implies \\sum u_n \\text{ diverge grossièrement (başka teste bakılmaz!).} $$\n    <p><em>Tuzak:</em> $\\lim u_n = 0$ olması serinin yakınsak olduğunu <strong>kanıtlamaz</strong>! (Örn: Harmonik seri $\\sum 1/n$ için $1/n \\to 0$ fakat seri ıraksar).</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Temel Referans: Geometrik Seri (Série Géométrique)</div>\n  <div class=\"theory-box-body\">\n    $$ \\sum_{n=0}^{+\\infty} q^n \\text{ converge} \\iff |q| < 1 $$\n    <p>Yakınsak olduğunda toplam formülü: $S = \\frac{1}{1-q}$ (ilk terim $q^0 = 1$ için). İlk terim $u_{n_0}$ ise $S = \\frac{u_{n_0}}{1-q}$.</p>\n  </div>\n</div>\n"
        },
        {
          "title": "2. Teleskopik Seriler & Toplam Hesabı (Télescopage)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Analitik Toplam Yöntemleri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Teleskopik Açılım & Basit Kesirlere Ayırma</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Teleskopik Seri İlkesi</div>\n  <div class=\"theory-box-body\">\n    <p>Genel terim $u_n = v_{n+1} - v_n$ veya $u_n = v_n - v_{n+1}$ biçiminde yazılabiliyorsa, ardışık terimler birbirini sadeleştirir:</p>\n    $$ S_N = \\sum_{n=0}^N (v_n - v_{n+1}) = (v_0 - v_1) + (v_1 - v_2) + \\dots + (v_N - v_{N+1}) = v_0 - v_{N+1} $$\n    <p>Böylece seri ancak ve ancak $(v_N)$ dizisi sonlu bir $\\ell$ limitine yakınsıyorsa yakınsar, ve serinin toplamı $S = v_0 - \\ell$ olur.</p>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Klasik Teleskopik Sınav Arketipi: Basit Kesirlere Ayırma</div>\n  <div class=\"theory-box-body\">\n    <p>Rasyonel ifadelerde payda çarpanlarına ayrılarak parçalanır:</p>\n    $$ \\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1} \\implies S_N = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{N} - \\frac{1}{N+1}\\right) = 1 - \\frac{1}{N+1} $$\n    $$ \\sum_{n=1}^{+\\infty} \\frac{1}{n(n+1)} = \\lim_{N\\to+\\infty} \\left(1 - \\frac{1}{N+1}\\right) = 1. $$\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Seri Tanımı & Zorunlu Şart (Divergence Grossière)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 1 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Sayısal Seriler, Kısmi Toplamlar ve Genel Terim Testi</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Tanım: Sayısal Seri ve Kısmi Toplamlar Dizisi ($S_N$)</div>\n  <div class=\"theory-box-body\">\n    <p>$(u_n)_{n\\ge 0}$ bir reel sayı dizisi olsun. $\\sum_{n=0}^{+\\infty} u_n$ serisinin yakınsaklığı, <strong>kısmi toplamlar dizisi</strong> $S_N = \\sum_{n=0}^N u_n$ üzerinden tanımlanır:</p>\n    $$ \\sum_{n=0}^{+\\infty} u_n = \\lim_{N\\to+\\infty} S_N = \\lim_{N\\to+\\infty} \\sum_{n=0}^N u_n $$\n    <p>Eğer bu limit sonlu bir $S \\in \\mathbb{R}$ sayısı ise seri <strong>yakınsaktır (convergente)</strong> ve toplamı $S$'dir. Limit sonsuzsa veya yoksa seri <strong>ıraksaktır (divergente)</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">0. REFLEKS: Zorunlu Şart (Condition Nécessaire / Divergence Grossière)</div>\n  <div class=\"theory-box-body\">\n    $$ \\sum u_n \\text{ converge} \\implies \\lim_{n\\to+\\infty} u_n = 0 $$\n    <p><strong>Karşıt Ters (Contraposée) :</strong> Genel terim $0$'a gitmiyorsa seri <strong>DOĞRUDAN IRAKSAKTIR</strong>:</p>\n    $$ \\lim_{n\\to+\\infty} u_n \\neq 0 \\implies \\sum u_n \\text{ diverge grossièrement (başka teste bakılmaz!).} $$\n    <p><em>Tuzak:</em> $\\lim u_n = 0$ olması serinin yakınsak olduğunu <strong>kanıtlamaz</strong>! (Örn: Harmonik seri $\\sum 1/n$ için $1/n \\to 0$ fakat seri ıraksar).</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Temel Referans: Geometrik Seri (Série Géométrique)</div>\n  <div class=\"theory-box-body\">\n    $$ \\sum_{n=0}^{+\\infty} q^n \\text{ converge} \\iff |q| < 1 $$\n    <p>Yakınsak olduğunda toplam formülü: $S = \\frac{1}{1-q}$ (ilk terim $q^0 = 1$ için). İlk terim $u_{n_0}$ ise $S = \\frac{u_{n_0}}{1-q}$.</p>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. Teleskopik Seriler & Toplam Hesabı (Télescopage)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Analitik Toplam Yöntemleri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Teleskopik Açılım & Basit Kesirlere Ayırma</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Teleskopik Seri İlkesi</div>\n  <div class=\"theory-box-body\">\n    <p>Genel terim $u_n = v_{n+1} - v_n$ veya $u_n = v_n - v_{n+1}$ biçiminde yazılabiliyorsa, ardışık terimler birbirini sadeleştirir:</p>\n    $$ S_N = \\sum_{n=0}^N (v_n - v_{n+1}) = (v_0 - v_1) + (v_1 - v_2) + \\dots + (v_N - v_{N+1}) = v_0 - v_{N+1} $$\n    <p>Böylece seri ancak ve ancak $(v_N)$ dizisi sonlu bir $\\ell$ limitine yakınsıyorsa yakınsar, ve serinin toplamı $S = v_0 - \\ell$ olur.</p>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Klasik Teleskopik Sınav Arketipi: Basit Kesirlere Ayırma</div>\n  <div class=\"theory-box-body\">\n    <p>Rasyonel ifadelerde payda çarpanlarına ayrılarak parçalanır:</p>\n    $$ \\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1} \\implies S_N = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{N} - \\frac{1}{N+1}\\right) = 1 - \\frac{1}{N+1} $$\n    $$ \\sum_{n=1}^{+\\infty} \\frac{1}{n(n+1)} = \\lim_{N\\to+\\infty} \\left(1 - \\frac{1}{N+1}\\right) = 1. $$\n  </div>\n</div>\n</div>"
    },
    "seriler_mod3": {
      "id": "seriler_mod3",
      "title": "Modül 3: TD 3 - Séries à Termes Positifs (Pozitif Terimli Seriler)",
      "shortTitle": "TD-3: Pozitif Terimli Seriler",
      "badge": "TD 3",
      "description": "Galatasaray Üniversitesi MAT201 TD 3 çalışma föyündeki 7 sorunun eksiksiz çözümü: Karşılaştırma testi, asimptotik denklik, Riemann serileri, Cauchy integral kriteri, d'Alembert oran testi ve büyüme hızları hiyerarşisi.",
      "exercises": [
        {
          "id": "s3_ex1",
          "name": "TD 3 • Ex 1 : Critère de Comparaison",
          "subtitle": "Eşlenik ile Çarpma ve Riemann Karşılaştırması",
          "tag": "TD 3",
          "concepts": [
            "series_riemann_bertrand"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Eşlenik ile Çarpma & Karşılaştırma Testi</div><div class=\"theory-box-body\">\n<strong>Quantité Conjuguée :</strong> $\\sqrt{A} - \\sqrt{B} = \\frac{A - B}{\\sqrt{A} + \\sqrt{B}}$.<br>\n<strong>Critère de Comparaison :</strong> Soient $\\sum u_n$ et $\\sum v_n$ deux séries à termes positifs telles que $0 \\le u_n \\le v_n$ à partir d'un certain rang. Si $\\sum v_n$ converge, alors $\\sum u_n$ converge.\n</div></div>\n<strong>TD 3 • Exercice 1 :</strong><br>\nÉtudier la nature de la série :\n$$ \\sum_{n \\ge 1} \\left( \\sqrt{n^3+5} - \\sqrt{n^3+2} \\right) $$\nRationaliser le terme général et le comparer à une série de Riemann.r",
          "hint": "Köklü ifadelerin farkında eşlenik çarpımı yap: $\\frac{(n^3+5) - (n^3+2)}{\\sqrt{n^3+5} + \\sqrt{n^3+2}} = \\frac{3}{\\sqrt{n^3+5} + \\sqrt{n^3+2}}$. Paydadaki baskın terim $n^{3/2}$ olduğu için ifade $\\frac{3}{2n^{3/2}}$ ile eşdeğerdir.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Rationalisation par la Quantité Conjuguée",
              "content": "<p>Le terme général est $u_n = \\sqrt{n^3+5} - \\sqrt{n^3+2}$.\nMultiplions et divisons par l'expression conjuguée $(\\sqrt{n^3+5} + \\sqrt{n^3+2}) > 0$ :\n$$ u_n = \\frac{(\\sqrt{n^3+5} - \\sqrt{n^3+2})(\\sqrt{n^3+5} + \\sqrt{n^3+2})}{\\sqrt{n^3+5} + \\sqrt{n^3+2}} $$\nEn utilisant l'identité remarquable $(a-b)(a+b) = a^2 - b^2$ :\n$$ u_n = \\frac{(n^3+5) - (n^3+2)}{\\sqrt{n^3+5} + \\sqrt{n^3+2}} = \\frac{3}{\\sqrt{n^3+5} + \\sqrt{n^3+2}} $$\nLe terme général est strictement positif pour tout $n \\ge 1$ : c'est bien une série à termes positifs.r"
            },
            {
              "title": "Étape 2 : Équivalent Asymptotique et Comparaison à Riemann",
              "content": "<p>Cherchons un équivalent du dénominateur quand $n \\to +\\infty$ :\n$$ \\sqrt{n^3+5} = \\sqrt{n^3 \\left(1 + \\frac{5}{n^3}\\right)} = n^{3/2} \\sqrt{1 + \\frac{5}{n^3}} \\sim n^{3/2} $$\n$$ \\sqrt{n^3+2} = \\sqrt{n^3 \\left(1 + \\frac{2}{n^3}\\right)} = n^{3/2} \\sqrt{1 + \\frac{2}{n^3}} \\sim n^{3/2} $$\nPar addition d'équivalents de même signe :\n$$ \\sqrt{n^3+5} + \\sqrt{n^3+2} \\sim 2 n^{3/2} $$\nPar conséquent, le terme général vérifie :\n$$ u_n \\sim \\frac{3}{2 n^{3/2}} \\quad \\text{quand } n \\to +\\infty $$\nOr, la série $\\sum_{n \\ge 1} \\frac{1}{n^{3/2}}$ est une <strong>série de Riemann</strong> avec le paramètre :\n$$ \\alpha = \\frac{3}{2} > 1 $$\nElle est donc <strong>convergente</strong>.\nD'après le théorème de comparaison par équivalents pour les séries à termes strictement positifs, la série $\\sum_{n \\ge 1} u_n$ est de même nature : <strong>elle converge</strong>. ■r"
            }
          ]
        },
        {
          "id": "s3_ex2",
          "name": "TD 3 • Ex 2 : Comparaison par Équivalents",
          "subtitle": "Rasyonel ve Köklü İfadelerde Baskın Terim Eşdeğerliği",
          "tag": "TD 3",
          "concepts": [
            "series_riemann_bertrand"
          ],
          "enonce": "<strong>TD 3 • Exercice 2 :</strong><br>\nÉtudier la nature des séries suivantes. Dans chaque cas, déterminer un équivalent simple du terme général et comparer avec une série de Riemann :\n$$ (1) \\quad \\sum_{n \\ge 1} \\frac{3n^2+2n+1}{n^4+1} \\qquad (2) \\quad \\sum_{n \\ge 1} \\frac{1}{\\sqrt{n^2+3n}} $$r",
          "hint": "Polinom oranlarında $n \\to +\\infty$ iken sadece en yüksek dereceli terimler kalır. (1) için $3n^2/n^4 = 3/n^2$ (Riemann $\\alpha=2>1$, yakınsar). (2) için $1/\\sqrt{n^2} = 1/n$ (harmonik seri, ıraksar).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Analyse de la Série (1)",
              "content": "<p>Soit $u_n = \\frac{3n^2+2n+1}{n^4+1}$. C'est une fraction rationnelle positive pour tout $n \\ge 1$.\nAu voisinage de $+\\infty$, un polynôme est équivalent à son monôme de plus haut degré :\n$$ 3n^2 + 2n + 1 \\sim 3n^2 \\quad \\text{et} \\quad n^4 + 1 \\sim n^4 $$\nPar quotient d'équivalents :\n$$ u_n \\sim \\frac{3n^2}{n^4} = \\frac{3}{n^2} $$\nLa série $\\sum_{n \\ge 1} \\frac{1}{n^2}$ est une série de Riemann avec $\\alpha = 2 > 1$, donc convergente.\nPar le critère d'équivalence pour les séries à termes positifs, la série $\\sum_{n \\ge 1} \\frac{3n^2+2n+1}{n^4+1}$ <strong>converge</strong>.r"
            },
            {
              "title": "Étape 2 : Analyse de la Série (2)",
              "content": "<p>Soit $v_n = \\frac{1}{\\sqrt{n^2+3n}}$. C'est un terme positif pour tout $n \\ge 1$.\nFactorisons par le terme dominant $n^2$ sous la racine :\n$$ \\sqrt{n^2+3n} = \\sqrt{n^2 \\left(1 + \\frac{3}{n}\\right)} = n \\sqrt{1 + \\frac{3}{n}} \\sim n $$\nPar conséquent :\n$$ v_n \\sim \\frac{1}{n} \\quad \\text{quand } n \\to +\\infty $$\nLa série $\\sum_{n \\ge 1} \\frac{1}{n}$ est la série harmonique (série de Riemann avec $\\alpha = 1 \\le 1$), qui est divergente.\nPar le critère d'équivalence, la série $\\sum_{n \\ge 1} \\frac{1}{\\sqrt{n^2+3n}}$ <strong>diverge</strong>. ■r"
            }
          ]
        },
        {
          "id": "s3_ex3",
          "name": "TD 3 • Ex 3 : Séries de Riemann",
          "subtitle": "Riemann Parametresi ve n^{(n+1)/n} Tuzağı",
          "tag": "TD 3",
          "concepts": [
            "series_riemann_bertrand"
          ],
          "enonce": "<strong>TD 3 • Exercice 3 :</strong><br>\n(1) Déterminer la nature de la série :\n$$ \\sum_{n \\ge 1} \\frac{1}{n^{3/4}} $$\n(2) Étudier la série suivante en remarquant que $\\frac{1}{n^{(n+1)/n}} = \\frac{1}{n} \\cdot \\frac{1}{n^{1/n}}$ :\n$$ \\sum_{n \\ge 1} \\frac{1}{n^{(n+1)/n}} $$r",
          "hint": "Riemann serisi $\\sum 1/n^\\alpha$ ancak ve ancak $\\alpha > 1$ ise yakınsar. $n^{1/n} = e^{\\frac{\\ln n}{n}} \\to e^0 = 1$ olduğu için $n^{(n+1)/n} \\sim n$ olur.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Série de Riemann Usuelle",
              "content": "<p>La série $\\sum_{n \\ge 1} \\frac{1}{n^{3/4}}$ est une série de Riemann de la forme $\\sum \\frac{1}{n^\\alpha}$ avec :\n$$ \\alpha = \\frac{3}{4} $$\nD'après le théorème fondamental de Riemann :\n$$ \\sum \\frac{1}{n^\\alpha} \\text{ converge } \\iff \\alpha > 1 $$\nPuisque $\\alpha = \\frac{3}{4} \\le 1$, la série $\\sum_{n \\ge 1} \\frac{1}{n^{3/4}}$ <strong>diverge</strong>.r"
            },
            {
              "title": "Étape 2 : Partie (2) — Analyse de la Série n^{(n+1)/n}",
              "content": "<p>Décomposons l'exposant :\n$$ \\frac{n+1}{n} = 1 + \\frac{1}{n} \\implies n^{(n+1)/n} = n^{1 + \\frac{1}{n}} = n^1 \\cdot n^{1/n} = n \\cdot n^{1/n} $$\nLe terme général est donc :\n$$ u_n = \\frac{1}{n^{(n+1)/n}} = \\frac{1}{n} \\times \\frac{1}{n^{1/n}} $$\nÉtudions la limite de $n^{1/n}$ quand $n \\to +\\infty$ :\n$$ n^{1/n} = \\exp\\left(\\frac{1}{n} \\ln n\\right) = \\exp\\left(\\frac{\\ln n}{n}\\right) $$\nPar croissances comparées, $\\lim_{n \\to +\\infty} \\frac{\\ln n}{n} = 0$. Par continuité de l'exponentielle :\n$$ \\lim_{n \\to +\\infty} n^{1/n} = e^0 = 1 \\implies \\lim_{n \\to +\\infty} \\frac{1}{n^{1/n}} = 1 $$\nIl en résulte l'équivalent fondamental :\n$$ u_n \\sim \\frac{1}{n} \\quad \\text{quand } n \\to +\\infty $$\nComme la série harmonique $\\sum_{n \\ge 1} \\frac{1}{n}$ diverge, par le critère d'équivalence des séries à termes positifs, la série $\\sum_{n \\ge 1} \\frac{1}{n^{(n+1)/n}}$ <strong>diverge</strong>. ■r"
            }
          ]
        },
        {
          "id": "s3_ex4",
          "name": "TD 3 • Ex 4 : Critère Intégral",
          "subtitle": "İntegral Testi ve Bertrand Serisi İspatı (∑ 1 / (n (ln n)^α))",
          "tag": "TD 3",
          "concepts": [
            "series_riemann_bertrand"
          ],
          "enonce": "<strong>TD 3 • Exercice 4 :</strong><br>\nPour $\\alpha \\in \\mathbb{R}$, on considère la série :\n$$ \\sum_{n \\ge 2} \\frac{1}{n (\\ln n)^\\alpha} $$\n(1) On pose $f(x) = \\frac{1}{x (\\ln x)^\\alpha}$. Montrer que pour tout $\\alpha > 0$, la fonction $f$ est positive et décroissante sur $[2, +\\infty[$.<br>\n(2) À l'aide du changement de variable $t = \\ln x$, étudier l'intégrale impropre :\n$$ \\int_2^{+\\infty} \\frac{dx}{x (\\ln x)^\\alpha} $$\n(3) En déduire que la série $\\sum_{n \\ge 2} \\frac{1}{n (\\ln n)^\\alpha}$ converge si et seulement si $\\alpha > 1$.r",
          "hint": "İntegral kriteri için $f$ pozitif, sürekli ve azalan olmalıdır. $t = \\ln x$ dönüşümüyle integral $\\int \\frac{dt}{t^\\alpha}$ Riemann integraline dönüşür ve ancak $\\alpha > 1$ ise yakınsar.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Étude des Hypothèses du Critère Intégral",
              "content": "<p>Soit $f(x) = \\frac{1}{x (\\ln x)^\\alpha}$ pour $x \\in [2, +\\infty[$.\nPour tout $x \\ge 2$, $x > 0$ et $\\ln x \\ge \\ln 2 > 0$. Donc $f(x) > 0$ : la fonction est <strong>strictement positive</strong> et continue sur $[2, +\\infty[$.\nPour $\\alpha > 0$, la fonction $x \\mapsto x$ est strictement croissante et positive, et la fonction $x \\mapsto (\\ln x)^\\alpha$ est strictement croissante et positive.\nLe dénominateur $g(x) = x (\\ln x)^\\alpha$ est donc le produit de deux fonctions strictement positives et strictement croissantes : il est <strong>strictement croissant</strong>.\nPar passage à l'inverse, $f(x) = \\frac{1}{g(x)}$ est <strong>strictement décroissante</strong> sur $[2, +\\infty[$.\nToutes les hypothèses du critère intégral de Cauchy sont vérifiées.r"
            },
            {
              "title": "Étape 2 : Calcul de l'Intégrale par Substitution",
              "content": "<p>Étudions pour $M > 2$ l'intégrale :\n$$ I(M) = \\int_2^M \\frac{dx}{x (\\ln x)^\\alpha} $$\nEffectuons le changement de variable $t = \\ln x$, d'où $dt = \\frac{dx}{x}$.\nLes bornes deviennent : pour $x = 2$, $t = \\ln 2$, et pour $x = M$, $t = \\ln M$.\nL'intégrale se réécrit :\n$$ I(M) = \\int_{\\ln 2}^{\\ln M} \\frac{dt}{t^\\alpha} $$\nDeux cas se présentent :\n<ul>\n  <li><strong>Si $\\alpha = 1$ :</strong>\n  $$ I(M) = [\\ln t]_{\\ln 2}^{\\ln M} = \\ln(\\ln M) - \\ln(\\ln 2) \\xrightarrow[M \\to +\\infty]{} +\\infty $$\n  L'intégrale diverge.</li>\n  <li><strong>Si $\\alpha \\ne 1$ :</strong>\n  $$ I(M) = \\left[ \\frac{t^{1-\\alpha}}{1-\\alpha} \\right]_{\\ln 2}^{\\ln M} = \\frac{(\\ln M)^{1-\\alpha} - (\\ln 2)^{1-\\alpha}}{1-\\alpha} $$\n  Lorsque $M \\to +\\infty$, $\\ln M \\to +\\infty$ :\n  - Si $1 - \\alpha > 0 \\iff \\alpha < 1$, alors $(\\ln M)^{1-\\alpha} \\to +\\infty$ : l'intégrale diverge.\n  - Si $1 - \\alpha < 0 \\iff \\alpha > 1$, alors $(\\ln M)^{1-\\alpha} \\to 0$ : l'intégrale converge vers $\\frac{(\\ln 2)^{1-\\alpha}}{\\alpha - 1}$.</li>\n</ul>r"
            },
            {
              "title": "Étape 3 : Conclusion par le Critère Intégral",
              "content": "<p>D'après le critère intégral, la série $\\sum_{n \\ge 2} f(n)$ et l'intégrale impropre $\\int_2^{+\\infty} f(x) dx$ sont de même nature.\nPar conséquent :\n$$ \\sum_{n \\ge 2} \\frac{1}{n (\\ln n)^\\alpha} \\text{ converge } \\iff \\alpha > 1 \\quad \\blacksquare $$\n<em>Remarque :</em> Si $\\alpha \\le 0$, alors $\\frac{1}{n (\\ln n)^\\alpha} \\ge \\frac{1}{n}$, et la série diverge par comparaison directe avec la série harmonique.r"
            }
          ]
        },
        {
          "id": "s3_ex5",
          "name": "TD 3 • Ex 5 : Critère de d'Alembert",
          "subtitle": "Faktöriyel ve nⁿ Terimlerinde Oran Testi (lim (1+1/n)ⁿ = e)",
          "tag": "TD 3",
          "concepts": [
            "theoreme_dalembert"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : D'Alembert Kriteri (Règle du Quotient)</div><div class=\"theory-box-body\">\nSoit $\\sum u_n$ une série à termes strictement positifs. On calcule $L = \\lim_{n \\to +\\infty} \\frac{u_{n+1}}{u_n}$ :\n<ul>\n  <li>$L < 1 \\implies$ la série <strong>converge</strong>.</li>\n  <li>$L > 1 \\implies$ la série <strong>diverge</strong>.</li>\n  <li>$L = 1 \\implies$ <strong>cas douteux</strong> (le test ne permet pas de conclure).</li>\n</ul>\nRappel fondamental : $\\lim_{n \\to +\\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2.718$.\n</div></div>\n<strong>TD 3 • Exercice 5 :</strong><br>\nÉtudier la nature des séries suivantes :\n$$ (1) \\quad \\sum_{n \\ge 1} \\frac{n!}{n^n} \\qquad (2) \\quad \\sum_{n \\ge 1} \\frac{2^n n!}{n^n} $$r",
          "hint": "Faktöriyel sadeleşmesi: $(n+1)! / n! = n+1$. Paydada $(n+1)^{n+1} = (n+1)(n+1)^n$. $(n/(n+1))^n = 1 / (1 + 1/n)^n \\to 1/e$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Analyse de la Série (1) avec d'Alembert",
              "content": "<p>Soit $u_n = \\frac{n!}{n^n}$. C'est une série à termes strictement positifs pour tout $n \\ge 1$.\nCalculons le quotient de d'Alembert $\\frac{u_{n+1}}{u_n}$ :\n$$ \\frac{u_{n+1}}{u_n} = \\frac{\\frac{(n+1)!}{(n+1)^{n+1}}}{\\frac{n!}{n^n}} = \\frac{(n+1)!}{(n+1)^{n+1}} \\times \\frac{n^n}{n!} $$\nSimplifions la factorielle $(n+1)! = (n+1) n!$ et la puissance $(n+1)^{n+1} = (n+1)(n+1)^n$ :\n$$ \\frac{u_{n+1}}{u_n} = \\frac{(n+1) \\cdot n! \\cdot n^n}{(n+1) \\cdot (n+1)^n \\cdot n!} = \\frac{n^n}{(n+1)^n} = \\left(\\frac{n}{n+1}\\right)^n $$\nInversons pour faire apparaître la forme usuelle :\n$$ \\frac{u_{n+1}}{u_n} = \\frac{1}{\\left(\\frac{n+1}{n}\\right)^n} = \\frac{1}{\\left(1 + \\frac{1}{n}\\right)^n} $$\nPassons à la limite quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\frac{u_{n+1}}{u_n} = \\frac{1}{e} $$\nPuisque $e \\approx 2.718 > 1$, nous avons :\n$$ L = \\frac{1}{e} < 1 $$\nD'après le critère de d'Alembert, la série $\\sum_{n \\ge 1} \\frac{n!}{n^n}$ <strong>converge</strong>.r"
            },
            {
              "title": "Étape 2 : Analyse de la Série (2) avec d'Alembert",
              "content": "<p>Soit $v_n = \\frac{2^n n!}{n^n}$.\nCalculons le rapport $\\frac{v_{n+1}}{v_n}$ :\n$$ \\frac{v_{n+1}}{v_n} = \\frac{2^{n+1} (n+1)!}{(n+1)^{n+1}} \\times \\frac{n^n}{2^n n!} = \\frac{2 \\cdot 2^n \\cdot (n+1) \\cdot n! \\cdot n^n}{2^n \\cdot n! \\cdot (n+1) \\cdot (n+1)^n} = 2 \\times \\left(\\frac{n}{n+1}\\right)^n $$\nEn utilisant la même transformation que ci-dessus :\n$$ \\frac{v_{n+1}}{v_n} = \\frac{2}{\\left(1 + \\frac{1}{n}\\right)^n} $$\nCalculons la limite quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\frac{v_{n+1}}{v_n} = \\frac{2}{e} $$\nComparons $2$ et $e$ : comme $e \\approx 2.71828$, on a $2 < e$, d'où :\n$$ L = \\frac{2}{e} \\approx 0.736 < 1 $$\nPuisque $L < 1$, d'après le critère de d'Alembert, la série $\\sum_{n \\ge 1} \\frac{2^n n!}{n^n}$ <strong>converge</strong>. ■r"
            }
          ]
        },
        {
          "id": "s3_ex6",
          "name": "TD 3 • Ex 6 : Choix d'un Critère Adapté",
          "subtitle": "Kriter Seçimi (ln n / n^{3/2} ve n^{1+1/ln n} Tuzağı)",
          "tag": "TD 3",
          "concepts": [
            "series_riemann_bertrand"
          ],
          "enonce": "<strong>TD 3 • Exercice 6 :</strong><br>\nÉtudier la nature des séries suivantes en choisissant dans chaque cas un critère adapté. Justifier le choix du critère :\n$$ (1) \\quad \\sum_{n \\ge 2} \\frac{\\ln n}{n^{3/2}} \\qquad (2) \\quad \\sum_{n \\ge 2} \\frac{1}{n^{1+1/\\ln n}} $$\n<em>Indication pour (1) :</em> on pourra utiliser le fait que pour $n$ suffisamment grand, $\\ln n \\le n^{1/4}$.r",
          "hint": "Birinci seri için $\\ln n \\le n^{1/4}$ üst sınırını kullan: $\\frac{\\ln n}{n^{3/2}} \\le \\frac{n^{1/4}}{n^{3/2}} = \\frac{1}{n^{5/4}}$ (Riemann $\\alpha=5/4>1$, yakınsak). İkinci seride $n^{1/\\ln n} = e^{\\ln(n)/\\ln(n)} = e$ olduğunu fark et!",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Analyse de la Série (1) par Majoration",
              "content": "<p>Soit $u_n = \\frac{\\ln n}{n^{3/2}}$ pour $n \\ge 2$.\nC'est une série à termes strictement positifs.\nPar croissances comparées, $\\lim_{n \\to +\\infty} \\frac{\\ln n}{n^{1/4}} = 0$. Il existe donc un rang $N_0$ tel que pour tout $n \\ge N_0$ :\n$$ \\ln n \\le n^{1/4} $$\nMajorer le terme général pour $n \\ge N_0$ :\n$$ 0 < u_n = \\frac{\\ln n}{n^{3/2}} \\le \\frac{n^{1/4}}{n^{3/2}} = \\frac{1}{n^{3/2 - 1/4}} = \\frac{1}{n^{5/4}} $$\nOr la série $\\sum_{n \\ge 2} \\frac{1}{n^{5/4}}$ est une <strong>série de Riemann</strong> d'exposant :\n$$ \\alpha = \\frac{5}{4} = 1.25 > 1 $$\nElle est donc convergente.\nPar le <strong>critère de comparaison</strong> des séries à termes positifs, la série $\\sum_{n \\ge 2} \\frac{\\ln n}{n^{3/2}}$ <strong>converge</strong>.r"
            },
            {
              "title": "Étape 2 : Analyse de la Série (2) — La Simplification Cachée",
              "content": "<p>Soit $v_n = \\frac{1}{n^{1+1/\\ln n}}$ pour $n \\ge 2$.\nDécomposons le dénominateur à l'aide des propriétés des puissances :\n$$ n^{1 + \\frac{1}{\\ln n}} = n^1 \\cdot n^{\\frac{1}{\\ln n}} = n \\cdot n^{\\frac{1}{\\ln n}} $$\nTransformons le terme $n^{\\frac{1}{\\ln n}}$ sous forme exponentielle :\n$$ n^{\\frac{1}{\\ln n}} = \\exp\\left( \\frac{1}{\\ln n} \\times \\ln n \\right) = \\exp(1) = e $$\nCette quantité est <strong>exactement constante et égale au nombre d'Euler $e$ pour tout $n \\ge 2$</strong> !\nPar conséquent, le terme général se simplifie de manière spectaculaire :\n$$ v_n = \\frac{1}{n \\cdot e} = \\frac{1}{e} \\times \\frac{1}{n} $$\nLa série s'écrit donc :\n$$ \\sum_{n \\ge 2} v_n = \\frac{1}{e} \\sum_{n \\ge 2} \\frac{1}{n} $$\nComme la série harmonique $\\sum_{n \\ge 2} \\frac{1}{n}$ diverge vers $+\\infty$ et que $\\frac{1}{e} > 0$, la série $\\sum_{n \\ge 2} \\frac{1}{n^{1+1/\\ln n}}$ <strong>diverge</strong>. ■r"
            }
          ]
        },
        {
          "id": "s3_ex7",
          "name": "TD 3 • Ex 7 : Vitesses de Croissance",
          "subtitle": "Büyüme Hızları ve d'Alembert (nᵖ / aⁿ ve aⁿ / n!)",
          "tag": "TD 3",
          "concepts": [
            "theoreme_dalembert"
          ],
          "enonce": "<strong>TD 3 • Exercice 7 :</strong><br>\nSoient $a > 1$ et $p > 0$.<br>\n(1) À l'aide du critère de d'Alembert, étudier la convergence des séries :\n$$ \\sum_{n \\ge 1} \\frac{n^p}{a^n} \\qquad \\text{et} \\qquad \\sum_{n \\ge 1} \\frac{a^n}{n!} $$\n(2) En déduire que $\\lim_{n \\to +\\infty} \\frac{n^p}{a^n} = 0$ et $\\lim_{n \\to +\\infty} \\frac{a^n}{n!} = 0$. Interpréter ces résultats en termes de vitesses de croissance.r",
          "hint": "Eğer bir seri yakınsaksa, genel terimi kesinlikle sıfıra gitmek zorundadır ($u_n \\to 0$). D'Alembert testi ile yakınsaklık kanıtlandıktan sonra genel terimin limiti bedavadan 0 çıkar.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Convergence de ∑ nᵖ / aⁿ par d'Alembert",
              "content": "<p>Soit $u_n = \\frac{n^p}{a^n}$ avec $a > 1$ et $p > 0$. C'est une série à termes strictement positifs.\nCalculons le rapport de d'Alembert :\n$$ \\frac{u_{n+1}}{u_n} = \\frac{(n+1)^p}{a^{n+1}} \\times \\frac{a^n}{n^p} = \\left(\\frac{n+1}{n}\\right)^p \\times \\frac{a^n}{a \\cdot a^n} = \\left(1 + \\frac{1}{n}\\right)^p \\times \\frac{1}{a} $$\nPassons à la limite quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\left(1 + \\frac{1}{n}\\right)^p = 1^p = 1 \\implies \\lim_{n \\to +\\infty} \\frac{u_{n+1}}{u_n} = \\frac{1}{a} $$\nPuisque $a > 1$, nous avons $L = \\frac{1}{a} < 1$.\nD'après le critère de d'Alembert, la série $\\sum_{n \\ge 1} \\frac{n^p}{a^n}$ <strong>converge</strong>.r"
            },
            {
              "title": "Étape 2 : Convergence de ∑ aⁿ / n! par d'Alembert",
              "content": "<p>Soit $v_n = \\frac{a^n}{n!}$.\nCalculons le rapport de d'Alembert :\n$$ \\frac{v_{n+1}}{v_n} = \\frac{a^{n+1}}{(n+1)!} \\times \\frac{n!}{a^n} = \\frac{a \\cdot a^n \\cdot n!}{(n+1) \\cdot n! \\cdot a^n} = \\frac{a}{n+1} $$\nPassons à la limite quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\frac{v_{n+1}}{v_n} = \\lim_{n \\to +\\infty} \\frac{a}{n+1} = 0 $$\nPuisque $L = 0 < 1$, d'après le critère de d'Alembert, la série $\\sum_{n \\ge 1} \\frac{a^n}{n!}$ <strong>converge</strong>.r"
            },
            {
              "title": "Étape 3 : Déduction des Limites et Hiérarchie Asymptotique",
              "content": "<p><strong>Théorème (Condition nécessaire) :</strong> Si une série converge, alors son terme général tend nécessairement vers 0.\nPuisque les séries $\\sum \\frac{n^p}{a^n}$ et $\\sum \\frac{a^n}{n!}$ convergent, nous concluons immédiatement :\n$$ \\lim_{n \\to +\\infty} \\frac{n^p}{a^n} = 0 \\quad \\text{et} \\quad \\lim_{n \\to +\\infty} \\frac{a^n}{n!} = 0 $$\n<p><strong>Interprétation en termes de vitesses de croissance :</strong>\nCes deux limites établissent rigoureusement la hiérarchie fondamentale des croissances comparées à l'infini :\n<ul>\n  <li>L'exponentielle $a^n$ ($a > 1$) croît strictement plus vite que toute puissance polynomiale $n^p$ : $n^p = o(a^n)$.</li>\n  <li>La factorielle $n!$ croît strictement plus vite que toute suite exponentielle géométrique $a^n$ : $a^n = o(n!)$.</li>\n</ul>\nEn résumé : $\\ln n \\ll n^p \\ll a^n \\ll n! \\ll n^n$. ■r"
            }
          ]
        }
      ],
      "breadcrumb": "MAT201 > Modül 3 (TD 3) > Pozitif Terimli Seriler",
      "concepts": [
        "series_riemann_bertrand",
        "theoreme_dalembert",
        "critere_cauchy_racine",
        "equivalence_series_positives"
      ],
      "theoryPages": [
        {
          "title": "1. Karşılaştırma & Asimptotik Eşdeğerlik (Équivalents)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 3 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Pozitif Terimli Serilerde Karşılaştırma ve Asimptotik Denklik</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Eşitsizlik ile Karşılaştırma Teoremi (Critère de Comparaison)</div>\n  <div class=\"theory-box-body\">\n    <p>Tüm $n$ için $0 \\le u_n \\le v_n$ olsun:</p>\n    <ul>\n      <li>$\\sum v_n$ yakınsıyorsa $\\implies \\sum u_n$ de <strong>yakınsar</strong> (büyük yakınsarsa küçük de yakınsar).</li>\n      <li>$\\sum u_n$ ıraksıyorsa $\\implies \\sum v_n$ de <strong>ıraksar</strong> (küçük ıraksarsa büyük de ıraksar).</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Asimptotik Denklik Kriteri (Critère d'Équivalence $\\sim$)</div>\n  <div class=\"theory-box-body\">\n    <p>Pozitif terimli serilerde en hızlı çözüm yoludur! Eğer $u_n > 0$, $v_n > 0$ ve $u_n \\sim_{n\\to\\infty} v_n$ ise:</p>\n    $$ \\sum u_n \\text{ ve } \\sum v_n \\text{ serileri } \\mathbf{aynı\\; karaktere} \\text{ sahiptir.} $$\n    <p><strong>Taylor / DL Eşdeğerlikleri ($x \\to 0$ iken) :</strong></p>\n    <ul>\n      <li>$\\sin(x) \\sim x$, $\\quad \\ln(1+x) \\sim x$, $\\quad e^x - 1 \\sim x$, $\\quad 1 - \\cos(x) \\sim \\frac{x^2}{2}$.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Referans Seriler: Riemann ve Bertrand</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>Séries de Riemann :</strong> $\\sum_{n\\ge 1} \\frac{1}{n^\\alpha}$ converge $\\iff \\mathbf{\\alpha > 1}$.</li>\n      <li><strong>Séries de Bertrand :</strong> $\\sum_{n\\ge 2} \\frac{1}{n^\\alpha (\\ln n)^\\beta}$ converge $\\iff (\\alpha > 1)$ veya $(\\alpha = 1 \\text{ ve } \\beta > 1)$.</li>\n    </ul>\n  </div>\n</div>\n"
        },
        {
          "title": "2. D'Alembert & Cauchy Kök Testleri",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Oran ve Kök Testleri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Règle de d'Alembert & Règle de Cauchy</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Règle de d'Alembert (Oran Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>Pozitif terimli $(u_n)$ için $L = \\lim_{n\\to+\\infty} \\frac{u_{n+1}}{u_n}$ oranına bakılır:</p>\n    <ul>\n      <li>$L < 1 \\implies \\sum u_n$ <strong>yakınsar</strong>.</li>\n      <li>$L > 1 \\implies \\sum u_n$ <strong>ıraksar</strong> (hatta genel terim sonsuza gider).</li>\n      <li>$L = 1 \\implies$ <strong>Kararsızdır (Doute)</strong>. Başka teste (Riemann, Asimptotik denklik) başvurulmalıdır.</li>\n    </ul>\n    <p><strong>Ne Zaman Kullanılır? :</strong> İçinde faktöriyel ($n!$) veya üstel terimler ($a^n$) bulunan sorularda ilk refleks d'Alembert'dir!</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Règle de Cauchy (n. Kök Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>Pozitif terimli $(u_n)$ için $L = \\lim_{n\\to+\\infty} \\sqrt[n]{u_n} = \\lim_{n\\to+\\infty} (u_n)^{1/n}$ limitine bakılır:</p>\n    <ul>\n      <li>$L < 1 \\implies \\sum u_n$ <strong>yakınsar</strong>.</li>\n      <li>$L > 1 \\implies \\sum u_n$ <strong>ıraksar</strong>.</li>\n      <li>$L = 1 \\implies$ <strong>Kararsızdır (Doute)</strong>.</li>\n    </ul>\n    <p><strong>Ne Zaman Kullanılır? :</strong> İfadenin tamamı parantez içinde $n$. kuvvete yükseltilmişse (örneğin $\\left(\\frac{n}{2n+1}\\right)^n$) Cauchy kök testi uygulanır.</p>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Karşılaştırma & Asimptotik Eşdeğerlik (Équivalents)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 3 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Pozitif Terimli Serilerde Karşılaştırma ve Asimptotik Denklik</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Eşitsizlik ile Karşılaştırma Teoremi (Critère de Comparaison)</div>\n  <div class=\"theory-box-body\">\n    <p>Tüm $n$ için $0 \\le u_n \\le v_n$ olsun:</p>\n    <ul>\n      <li>$\\sum v_n$ yakınsıyorsa $\\implies \\sum u_n$ de <strong>yakınsar</strong> (büyük yakınsarsa küçük de yakınsar).</li>\n      <li>$\\sum u_n$ ıraksıyorsa $\\implies \\sum v_n$ de <strong>ıraksar</strong> (küçük ıraksarsa büyük de ıraksar).</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Asimptotik Denklik Kriteri (Critère d'Équivalence $\\sim$)</div>\n  <div class=\"theory-box-body\">\n    <p>Pozitif terimli serilerde en hızlı çözüm yoludur! Eğer $u_n > 0$, $v_n > 0$ ve $u_n \\sim_{n\\to\\infty} v_n$ ise:</p>\n    $$ \\sum u_n \\text{ ve } \\sum v_n \\text{ serileri } \\mathbf{aynı\\; karaktere} \\text{ sahiptir.} $$\n    <p><strong>Taylor / DL Eşdeğerlikleri ($x \\to 0$ iken) :</strong></p>\n    <ul>\n      <li>$\\sin(x) \\sim x$, $\\quad \\ln(1+x) \\sim x$, $\\quad e^x - 1 \\sim x$, $\\quad 1 - \\cos(x) \\sim \\frac{x^2}{2}$.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Referans Seriler: Riemann ve Bertrand</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>Séries de Riemann :</strong> $\\sum_{n\\ge 1} \\frac{1}{n^\\alpha}$ converge $\\iff \\mathbf{\\alpha > 1}$.</li>\n      <li><strong>Séries de Bertrand :</strong> $\\sum_{n\\ge 2} \\frac{1}{n^\\alpha (\\ln n)^\\beta}$ converge $\\iff (\\alpha > 1)$ veya $(\\alpha = 1 \\text{ ve } \\beta > 1)$.</li>\n    </ul>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. D'Alembert & Cauchy Kök Testleri</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Oran ve Kök Testleri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Règle de d'Alembert & Règle de Cauchy</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Règle de d'Alembert (Oran Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>Pozitif terimli $(u_n)$ için $L = \\lim_{n\\to+\\infty} \\frac{u_{n+1}}{u_n}$ oranına bakılır:</p>\n    <ul>\n      <li>$L < 1 \\implies \\sum u_n$ <strong>yakınsar</strong>.</li>\n      <li>$L > 1 \\implies \\sum u_n$ <strong>ıraksar</strong> (hatta genel terim sonsuza gider).</li>\n      <li>$L = 1 \\implies$ <strong>Kararsızdır (Doute)</strong>. Başka teste (Riemann, Asimptotik denklik) başvurulmalıdır.</li>\n    </ul>\n    <p><strong>Ne Zaman Kullanılır? :</strong> İçinde faktöriyel ($n!$) veya üstel terimler ($a^n$) bulunan sorularda ilk refleks d'Alembert'dir!</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Règle de Cauchy (n. Kök Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>Pozitif terimli $(u_n)$ için $L = \\lim_{n\\to+\\infty} \\sqrt[n]{u_n} = \\lim_{n\\to+\\infty} (u_n)^{1/n}$ limitine bakılır:</p>\n    <ul>\n      <li>$L < 1 \\implies \\sum u_n$ <strong>yakınsar</strong>.</li>\n      <li>$L > 1 \\implies \\sum u_n$ <strong>ıraksar</strong>.</li>\n      <li>$L = 1 \\implies$ <strong>Kararsızdır (Doute)</strong>.</li>\n    </ul>\n    <p><strong>Ne Zaman Kullanılır? :</strong> İfadenin tamamı parantez içinde $n$. kuvvete yükseltilmişse (örneğin $\\left(\\frac{n}{2n+1}\\right)^n$) Cauchy kök testi uygulanır.</p>\n  </div>\n</div>\n</div>"
    },
    "seriler_mod4": {
      "id": "seriler_mod4",
      "title": "Modül 4: TD 4 - Séries Alternées & Critère de Cauchy (Alterne Seriler)",
      "shortTitle": "TD-4: Alterne Seriler & Cauchy",
      "badge": "TD 4",
      "description": "Galatasaray Üniversitesi MAT201 TD 4 çalışma föyündeki 5 sorunun eksiksiz çözümü: Mutlak yakınsaklık, Leibniz alterne seri kriteri, trigonometrik alterne seriler, Cauchy kök testi ve pozitif/negatif parça ayrışımı.",
      "exercises": [
        {
          "id": "s4_ex1",
          "name": "TD 4 • Ex 1 : Convergence Absolue",
          "subtitle": "Alterne Dizi Tanımı ve Mutlak Yakınsaklık (sin n / n² Tuzağı)",
          "tag": "TD 4",
          "concepts": [
            "series_telescopiques_absolue",
            "series_riemann_bertrand"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Mutlak Yakınsaklık (Convergence Absolue)</div><div class=\"theory-box-body\">\nUne série réelle $\\sum u_n$ est dite <strong>absolument convergente</strong> si la série des valeurs absolues $\\sum |u_n|$ converge.\n<strong>Théorème fondamental :</strong> Toute série absolument convergente est convergente dans $\\mathbb{R}$.\n$$ \\sum |u_n| \\text{ converge } \\implies \\sum u_n \\text{ converge} $$\n</div></div>\n<strong>TD 4 • Exercice 1 :</strong><br>\nOn considère les trois séries suivantes :\n$$ S_1 = \\sum_{n \\ge 1} \\frac{\\sin n}{n^2}, \\qquad S_2 = \\sum_{n \\ge 1} \\frac{(-1)^n (2 + \\cos n)}{n^2}, \\qquad S_3 = \\sum_{n \\ge 1} \\frac{(-1)^n}{n^2} $$\n(1) Lesquelles de ces séries sont alternées ?<br>\n(2) Étudier la convergence absolue de chacune de ces séries.<br>\n(3) En déduire leur convergence.r",
          "hint": "Alterne seri her adımda kesinlikle işaret değiştirmelidir ($(-1)^n a_n, a_n > 0$). $\\sin n$ alternatif işaretli DEĞİLDİR (çünkü $\\sin 1 > 0, \\sin 2 > 0, \\sin 3 > 0$). Mutlak yakınsaklık için $|\\sin n| \\le 1$ ve $|2+\\cos n| \\le 3$ eşitsizliklerini kullan.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Identification Rigoureuse des Séries Alternées",
              "content": "<p>Par définition, une série réelle $\\sum u_n$ est <strong>alternée</strong> si ses termes sont alternativement strictement positifs et strictement négatifs, c'est-à-dire si elle peut s'écrire sous la forme $\\sum (-1)^n a_n$ ou $\\sum (-1)^{n+1} a_n$ avec $a_n > 0$ pour tout $n$.\nExaminons chacune des trois séries :\n<ul>\n  <li><strong>Série $S_3 = \\sum \\frac{(-1)^n}{n^2}$ :</strong>\n  Le terme s'écrit $(-1)^n a_n$ avec $a_n = \\frac{1}{n^2} > 0$. Elle est <strong>clairement alternée</strong> (+, -, +, -, ...).</li>\n  <li><strong>Série $S_2 = \\sum \\frac{(-1)^n (2 + \\cos n)}{n^2}$ :</strong>\n  Pour tout $n$, on a $-1 \\le \\cos n \\le 1$, donc $2 + \\cos n \\ge 2 - 1 = 1 > 0$.\n  Par suite, $a_n = \\frac{2 + \\cos n}{n^2}$ est <em>strictement positif pour tout $n \\ge 1$</em>.\n  Le signe de chaque terme est donc uniquement et strictement déterminé par $(-1)^n$.\n  La série $S_2$ est <strong>alternée</strong>.</li>\n  <li><strong>Série $S_1 = \\sum \\frac{\\sin n}{n^2}$ :</strong>\n  Calculons le signe de $\\sin n$ pour les premiers entiers en radians :\n  $\\sin(1) \\approx +0.841 > 0$, $\\sin(2) \\approx +0.909 > 0$, $\\sin(3) \\approx +0.141 > 0$, $\\sin(4) \\approx -0.757 < 0$.\n  Les trois premiers termes sont tous strictement positifs ! La suite des signes est $(+, +, +, -, -, -, +, \\dots)$.\n  La série $S_1$ <strong>N'EST PAS une série alternée</strong>.</li>\n</ul>r"
            },
            {
              "title": "Étape 2 : Partie (2) — Étude de la Convergence Absolue",
              "content": "<p>Étudions la série des valeurs absolues $\\sum |u_n|$ pour chacune des trois séries :\n<ul>\n  <li><strong>Pour $S_1$ :</strong>\n  $|u_n| = \\left|\\frac{\\sin n}{n^2}\\right| = \\frac{|\\sin n|}{n^2} \\le \\frac{1}{n^2}$.\n  La série $\\sum \\frac{1}{n^2}$ est une série de Riemann convergente ($\\alpha = 2 > 1$).\n  Par comparaison de séries à termes positifs, $\\sum |u_n|$ converge.\n  $S_1$ est donc <strong>absolument convergente</strong>.</li>\n  <li><strong>Pour $S_2$ :</strong>\n  $|u_n| = \\left|\\frac{(-1)^n (2 + \\cos n)}{n^2}\\right| = \\frac{|2 + \\cos n|}{n^2} \\le \\frac{2 + |\\cos n|}{n^2} \\le \\frac{3}{n^2}$.\n  Comme $\\sum \\frac{3}{n^2} = 3 \\sum \\frac{1}{n^2}$ converge, par comparaison, $\\sum |u_n|$ converge.\n  $S_2$ est donc <strong>absolument convergente</strong>.</li>\n  <li><strong>Pour $S_3$ :</strong>\n  $|u_n| = \\left|\\frac{(-1)^n}{n^2}\\right| = \\frac{1}{n^2}$.\n  C'est exactement la série de Riemann avec $\\alpha = 2 > 1$, donc convergente.\n  $S_3$ est donc <strong>absolument convergente</strong>.</li>\n</ul>r"
            },
            {
              "title": "Étape 3 : Partie (3) — Déduction de la Convergence",
              "content": "<p><strong>Théorème :</strong> Toute série absolument convergente est convergente dans $\\mathbb{R}$.\nPuisque les trois séries $S_1$, $S_2$ et $S_3$ sont absolument convergentes, nous concluons immédiatement :\n$$ \\text{Les trois séries } S_1, \\; S_2 \\; \\text{ et } S_3 \\text{ sont toutes les trois } \\mathbf{convergentes} \\text{ dans } \\mathbb{R}. \\quad \\blacksquare $$r"
            }
          ]
        },
        {
          "id": "s4_ex2",
          "name": "TD 4 • Ex 2 : Critère de Leibniz",
          "subtitle": "Alterne Seri Testi ve Şartlı Yakınsaklık (Semi-Convergence)",
          "tag": "TD 4",
          "concepts": [
            "critere_leibniz_series",
            "series_riemann_bertrand"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Leibniz Kriteri (Théorème Spécial des Séries Alternées)</div><div class=\"theory-box-body\">\nSoit la série alternée $\\sum (-1)^{n+1} a_n$ (ou $\\sum (-1)^n a_n$) avec $a_n > 0$. Si :\n<ol>\n  <li>La suite $(a_n)$ est <strong>décroissante</strong> ($a_{n+1} \\le a_n$ pour tout $n$),</li>\n  <li>$\\lim_{n \\to +\\infty} a_n = 0$,</li>\n</ol>\nalors la série $\\sum (-1)^{n+1} a_n$ <strong>converge</strong>.\n</div></div>\n<strong>TD 4 • Exercice 2 :</strong><br>\nÉtudier la nature des deux séries suivantes. Pour chacune :\n(1) Vérifier les hypothèses du critère de Leibniz.<br>\n(2) En déduire la convergence, et déterminer si la convergence est absolue ou conditionnelle :\n$$ (a) \\quad \\sum_{n \\ge 1} \\frac{(-1)^{n+1}}{\\sqrt{n}} \\qquad (b) \\quad \\sum_{n \\ge 1} \\frac{(-1)^{n+1} n}{n^2 + 1} $$r",
          "hint": "Azalanlığı göstermek için (a)'da doğrudan payda artışına bak ($n+1 > n \\implies \\sqrt{n+1} > \\sqrt{n}$). (b)'de ise $f(x) = \\frac{x}{x^2+1}$ fonksiyonunun türevini al: $f'(x) = \\frac{1-x^2}{(x^2+1)^2} \\le 0$ ($x \\ge 1$).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Analyse Complète de la Série (a)",
              "content": "<p>Soit $u_n = \\frac{(-1)^{n+1}}{\\sqrt{n}} = (-1)^{n+1} a_n$ avec $a_n = \\frac{1}{\\sqrt{n}}$.\nVérifions les hypothèses de Leibniz :\n<ul>\n  <li><strong>Positivité :</strong> Pour tout $n \\ge 1$, $a_n = \\frac{1}{\\sqrt{n}} > 0$.</li>\n  <li><strong>Décroissance :</strong> Pour tout $n \\ge 1$, $n+1 > n \\implies \\sqrt{n+1} > \\sqrt{n} \\implies \\frac{1}{\\sqrt{n+1}} < \\frac{1}{\\sqrt{n}} \\implies a_{n+1} < a_n$. La suite $(a_n)$ est strictement décroissante.</li>\n  <li><strong>Limite nulle :</strong> $\\lim_{n \\to +\\infty} a_n = \\lim_{n \\to +\\infty} \\frac{1}{\\sqrt{n}} = 0$.</li>\n</ul>\nToutes les hypothèses du critère de Leibniz sont satisfaites : <strong>la série converge</strong>.\n<p><strong>Étude de la convergence absolue :</strong>\n$|u_n| = \\frac{1}{\\sqrt{n}} = \\frac{1}{n^{1/2}}$.\nC'est une série de Riemann avec $\\alpha = \\frac{1}{2} \\le 1$, donc <strong>divergente</strong>.\nLa série ne converge pas absolument. Elle est <strong>semi-convergente (conditionnellement convergente)</strong>.r"
            },
            {
              "title": "Étape 2 : Analyse Complète de la Série (b)",
              "content": "<p>Soit $v_n = \\frac{(-1)^{n+1} n}{n^2 + 1} = (-1)^{n+1} b_n$ avec $b_n = \\frac{n}{n^2 + 1}$.\nVérifions les hypothèses de Leibniz :\n<ul>\n  <li><strong>Positivité :</strong> Pour tout $n \\ge 1$, $b_n = \\frac{n}{n^2 + 1} > 0$.</li>\n  <li><strong>Décroissance par étude de fonction :</strong>\n  Considérons la fonction associée $f(x) = \\frac{x}{x^2 + 1}$ sur $[1, +\\infty[$.\n  $f$ est dérivable et :\n  $$ f'(x) = \\frac{1 \\cdot (x^2 + 1) - x \\cdot (2x)}{(x^2 + 1)^2} = \\frac{x^2 + 1 - 2x^2}{(x^2 + 1)^2} = \\frac{1 - x^2}{(x^2 + 1)^2} $$\n  Pour tout $x \\ge 1$, $x^2 \\ge 1 \\implies 1 - x^2 \\le 0 \\implies f'(x) \\le 0$.\n  La fonction $f$ est décroissante sur $[1, +\\infty[$, ce qui implique que la suite $(b_n) = (f(n))$ est <strong>strictement décroissante à partir du rang 1</strong>.</li>\n  <li><strong>Limite nulle :</strong> $\\lim_{n \\to +\\infty} b_n = \\lim_{n \\to +\\infty} \\frac{n}{n^2 + 1} = \\lim_{n \\to +\\infty} \\frac{1}{n} = 0$.</li>\n</ul>\nD'après le critère de Leibniz, <strong>la série converge</strong>.\n<p><strong>Étude de la convergence absolue :</strong>\n$|v_n| = \\frac{n}{n^2 + 1} \\sim \\frac{n}{n^2} = \\frac{1}{n}$.\nLa série harmonique $\\sum \\frac{1}{n}$ diverge. Par le critère d'équivalence des séries à termes positifs, $\\sum |v_n|$ diverge.\nLa série converge conditionnellement : elle est <strong>semi-convergente</strong>. ■r"
            }
          ]
        },
        {
          "id": "s4_ex3",
          "name": "TD 4 • Ex 3 : Reconnaître une Série Alternée",
          "subtitle": "Trigonometrik Alterne Seri İndirgemesi (∑ sin(nπ/2) / (n+1))",
          "tag": "TD 4",
          "concepts": [
            "critere_leibniz_series"
          ],
          "enonce": "<strong>TD 4 • Exercice 3 :</strong><br>\nOn considère la série numérique :\n$$ \\sum_{n \\ge 0} \\frac{\\sin(n\\pi/2)}{n+1} $$\n(1) Calculer $\\sin(n\\pi/2)$ pour $n = 0, 1, 2, 3, 4, 5, 6, 7$.<br>\n(2) Montrer que les termes d'indice pair sont tous nuls.<br>\n(3) Montrer que pour $n = 2k + 1$, on a $\\sin((2k+1)\\pi/2) = (-1)^k$.<br>\n(4) En déduire que la série peut s'écrire sous la forme :\n$$ \\sum_{k \\ge 0} \\frac{(-1)^k}{2k + 2} $$\n(5) Montrer que cette série converge.<br>\n(6) La convergence est-elle absolue ? Justifier.r",
          "hint": "Çift indislerde $\\sin(k\\pi) = 0$ olduğu için terimler düşer. Tek indislerde $\\sin(k\\pi + \\pi/2) = (-1)^k$ kalır. Yeni seriye Leibniz testi uygulanır.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Parties (1), (2) et (3) — Analyse Périodique de sin(nπ/2)",
              "content": "<p><strong>(1) Calcul des valeurs pour $n = 0, \\dots, 7$ :</strong>\n$$ n=0 : \\sin(0) = 0 $$\n$$ n=1 : \\sin(\\pi/2) = 1 $$\n$$ n=2 : \\sin(\\pi) = 0 $$\n$$ n=3 : \\sin(3\\pi/2) = -1 $$\n$$ n=4 : \\sin(2\\pi) = 0 $$\n$$ n=5 : \\sin(5\\pi/2) = 1 $$\n$$ n=6 : \\sin(3\\pi) = 0 $$\n$$ n=7 : \\sin(7\\pi/2) = -1 $$\nLa suite $(\\sin(n\\pi/2))$ est périodique de période 4, avec le motif $(0, 1, 0, -1, 0, 1, 0, -1, \\dots)$.\n<p><strong>(2) Annulation des termes pairs :</strong>\nSoit $n$ un entier pair, c'est-à-dire $n = 2m$ avec $m \\in \\mathbb{N}$.\n$$ \\sin\\left(\\frac{2m\\pi}{2}\\right) = \\sin(m\\pi) = 0 $$\nTous les termes d'indice pair sont rigoureusement nuls.\n<p><strong>(3) Formule pour les termes impairs :</strong>\nSoit $n$ un entier impair, c'est-à-dire $n = 2k + 1$ avec $k \\in \\mathbb{N}$.\n$$ \\sin\\left(\\frac{(2k+1)\\pi}{2}\\right) = \\sin\\left(k\\pi + \\frac{\\pi}{2}\\right) = \\sin(k\\pi)\\cos\\left(\\frac{\\pi}{2}\\right) + \\cos(k\\pi)\\sin\\left(\\frac{\\pi}{2}\\right) $$\nComme $\\sin(k\\pi) = 0$, $\\sin(\\pi/2) = 1$ et $\\cos(k\\pi) = (-1)^k$ :\n$$ \\sin\\left(\\frac{(2k+1)\\pi}{2}\\right) = (-1)^k \\times 1 = (-1)^k $$r"
            },
            {
              "title": "Étape 2 : Partie (4) — Réécriture de la Série",
              "content": "<p>Puisque tous les termes pairs sont nuls, la série se réduit à la somme de ses termes d'indice impair $n = 2k + 1$ pour $k \\ge 0$.\nPour $n = 2k + 1$, le dénominateur devient :\n$$ n + 1 = (2k + 1) + 1 = 2k + 2 $$\nEn substituant le numérateur $(-1)^k$ et le dénominateur $2k+2$ :\n$$ \\sum_{n=0}^{+\\infty} \\frac{\\sin(n\\pi/2)}{n+1} = \\sum_{k=0}^{+\\infty} \\frac{(-1)^k}{2k+2} \\quad \\blacksquare $$r"
            },
            {
              "title": "Étape 3 : Parties (5) et (6) — Convergence et Convergence Absolue",
              "content": "<p><strong>(5) Convergence par Leibniz :</strong>\nLa série s'écrit $\\sum_{k=0}^{+\\infty} (-1)^k c_k$ avec $c_k = \\frac{1}{2k+2}$.\n- $c_k > 0$ pour tout $k \\ge 0$.\n- La suite $(c_k)$ est strictement décroissante car $2(k+1)+2 = 2k+4 > 2k+2 \\implies c_{k+1} < c_k$.\n- $\\lim_{k \\to +\\infty} c_k = \\lim_{k \\to +\\infty} \\frac{1}{2k+2} = 0$.\nD'après le critère de Leibniz, <strong>la série converge</strong>.\n<p><strong>(6) Étude de la convergence absolue :</strong>\nConsidérons la série des valeurs absolues :\n$$ \\sum_{k=0}^{+\\infty} |u_k| = \\sum_{k=0}^{+\\infty} \\frac{1}{2k+2} = \\frac{1}{2} \\sum_{k=0}^{+\\infty} \\frac{1}{k+1} = \\frac{1}{2} \\sum_{j=1}^{+\\infty} \\frac{1}{j} $$\nC'est exactement la moitié de la série harmonique, qui diverge vers $+\\infty$.\nLa convergence <strong>N'EST PAS absolue</strong> : la série est semi-convergente. ■r"
            }
          ]
        },
        {
          "id": "s4_ex4",
          "name": "TD 4 • Ex 4 : Critère de Cauchy (Règle de la Racine n-ième)",
          "subtitle": "Kök Testi ve n. Kuvvet İfadeleri (lim (1-2/n)ⁿ = e⁻²)",
          "tag": "TD 4",
          "concepts": [
            "critere_cauchy_racine"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Cauchy Kök Testi (Règle de la Racine n-ième)</div><div class=\"theory-box-body\">\nSoit $\\sum u_n$ une série réelle. On calcule la limite de la racine $n$-ième :\n$$ L = \\lim_{n \\to +\\infty} \\sqrt[n]{|u_n|} = \\lim_{n \\to +\\infty} |u_n|^{1/n} $$\n<ul>\n  <li>$L < 1 \\implies$ la série converge absolument (et donc converge).</li>\n  <li>$L > 1 \\implies$ la série diverge grossièrement ($|u_n| \\to +\\infty$).</li>\n  <li>$L = 1 \\implies$ cas douteux (le test ne permet pas de conclure).</li>\n</ul>\nFormule utile : $\\lim_{n \\to +\\infty} \\left(1 + \\frac{x}{n}\\right)^n = e^x$.\n</div></div>\n<strong>TD 4 • Exercice 4 :</strong><br>\nÉtudier la nature des trois séries suivantes. Pour chacune : (1) calculer $\\sqrt[n]{|u_n|}$, (2) déterminer sa limite et conclure :\n$$ (a) \\quad \\sum_{n \\ge 1} \\left( \\frac{2n+1}{3n+2} \\right)^n \\qquad (b) \\quad \\sum_{n \\ge 3} \\left( 1 - \\frac{2}{n} \\right)^{n^2} \\qquad (c) \\quad \\sum_{n \\ge 1} \\left( \\frac{n^2-2}{3n^2} \\right)^n $$r",
          "hint": "(b) şıkkında $\\sqrt[n]{(1-2/n)^{n^2}} = (1-2/n)^{n^2/n} = (1-2/n)^n$. Bu limit $e^{-2} = 1/e^2 < 1$ verir.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Analyse de la Série (a)",
              "content": "<p>Soit $u_n = \\left(\\frac{2n+1}{3n+2}\\right)^n$. C'est un terme strictement positif pour $n \\ge 1$.\n(1) Calcul de la racine $n$-ième :\n$$ \\sqrt[n]{|u_n|} = \\left( \\left(\\frac{2n+1}{3n+2}\\right)^n \\right)^{1/n} = \\frac{2n+1}{3n+2} $$\n(2) Limite et conclusion :\nFactorisons par le terme dominant $n$ au numérateur et au dénominateur :\n$$ \\lim_{n \\to +\\infty} \\sqrt[n]{|u_n|} = \\lim_{n \\to +\\infty} \\frac{2 + \\frac{1}{n}}{3 + \\frac{2}{n}} = \\frac{2}{3} $$\nPuisque la limite vérifie $L = \\frac{2}{3} < 1$, d'après le critère de Cauchy, la série $\\sum_{n \\ge 1} \\left(\\frac{2n+1}{3n+2}\\right)^n$ <strong>converge absolument</strong>.r"
            },
            {
              "title": "Étape 2 : Analyse de la Série (b)",
              "content": "<p>Soit $v_n = \\left(1 - \\frac{2}{n}\\right)^{n^2}$ pour $n \\ge 3$.\nComme $n \\ge 3$, $1 - \\frac{2}{n} \\ge 1 - \\frac{2}{3} = \\frac{1}{3} > 0$, le terme est positif.\n(1) Calcul de la racine $n$-ième :\n$$ \\sqrt[n]{|v_n|} = \\left( \\left(1 - \\frac{2}{n}\\right)^{n^2} \\right)^{1/n} = \\left(1 - \\frac{2}{n}\\right)^{\\frac{n^2}{n}} = \\left(1 - \\frac{2}{n}\\right)^n $$\n(2) Limite et conclusion :\nEn utilisant la limite classique fondamentale $\\lim_{n \\to +\\infty} \\left(1 + \\frac{x}{n}\\right)^n = e^x$ avec $x = -2$ :\n$$ \\lim_{n \\to +\\infty} \\sqrt[n]{|v_n|} = \\lim_{n \\to +\\infty} \\left(1 - \\frac{2}{n}\\right)^n = e^{-2} = \\frac{1}{e^2} $$\nPuisque $e \\approx 2.718$, $e^2 \\approx 7.389$, d'où :\n$$ L = \\frac{1}{e^2} \\approx 0.135 < 1 $$\nComme $L < 1$, d'après le critère de Cauchy, la série $\\sum_{n \\ge 3} \\left(1 - \\frac{2}{n}\\right)^{n^2}$ <strong>converge absolument</strong>.r"
            },
            {
              "title": "Étape 3 : Analyse de la Série (c)",
              "content": "<p>Soit $w_n = \\left(\\frac{n^2-2}{3n^2}\\right)^n$ pour $n \\ge 1$.\n(1) Calcul de la racine $n$-ième :\n$$ \\sqrt[n]{|w_n|} = \\frac{n^2 - 2}{3n^2} = \\frac{1}{3} - \\frac{2}{3n^2} $$\n(2) Limite et conclusion :\n$$ \\lim_{n \\to +\\infty} \\sqrt[n]{|w_n|} = \\lim_{n \\to +\\infty} \\left(\\frac{1}{3} - \\frac{2}{3n^2}\\right) = \\frac{1}{3} $$\nPuisque $L = \\frac{1}{3} < 1$, d'après le critère de Cauchy, la série $\\sum_{n \\ge 1} \\left(\\frac{n^2-2}{3n^2}\\right)^n$ <strong>converge absolument</strong>. ■r"
            }
          ]
        },
        {
          "id": "s4_ex5",
          "name": "TD 4 • Ex 5 : Propriétés de la Convergence Absolue",
          "subtitle": "Pozitif ve Negatif Parçalar (u_n = u_n⁺ - u_n⁻ ve Lineerlik)",
          "tag": "TD 4",
          "concepts": [
            "series_telescopiques_absolue"
          ],
          "enonce": "<strong>TD 4 • Exercice 5 :</strong><br>\nSoit $\\sum_{n \\ge 0} u_n$ une série réelle absolument convergente. On définit la partie positive et la partie négative par :\n$$ u_n^+ = \\max(u_n, 0) \\qquad \\text{et} \\qquad u_n^- = \\max(-u_n, 0) $$\n(1) Montrer que $u_n = u_n^+ - u_n^-$ et $|u_n| = u_n^+ + u_n^-$.<br>\n(2) Montrer que $0 \\le u_n^+ \\le |u_n|$ et $0 \\le u_n^- \\le |u_n|$.<br>\n(3) En déduire que les séries à termes positifs $\\sum u_n^+$ et $\\sum u_n^-$ convergent.<br>\n(4) Montrer que $\\sum_{n \\ge 0} u_n = \\sum_{n \\ge 0} u_n^+ - \\sum_{n \\ge 0} u_n^-$. Pourquoi ce résultat est-il faux pour les séries semi-convergentes ?r",
          "hint": "$u_n \\ge 0$ ve $u_n < 0$ durumlarını ayrı ayrı yaz. Pozitif serilerde karşılaştırma testiyle $\\sum u_n^+ \\le \\sum |u_n| < \\infty$ olur.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Relations Algébriques Fondamentales",
              "content": "<p>Analysons les deux cas selon le signe de $u_n$ :\n<ul>\n  <li><strong>Premier cas : $u_n \\ge 0$</strong><br>\n  Alors $u_n^+ = \\max(u_n, 0) = u_n$ et $u_n^- = \\max(-u_n, 0) = 0$ (car $-u_n \\le 0$).<br>\n  Calculons :\n  $$ u_n^+ - u_n^- = u_n - 0 = u_n $$\n  $$ u_n^+ + u_n^- = u_n + 0 = u_n = |u_n| $$</li>\n  <li><strong>Deuxième cas : $u_n < 0$</strong><br>\n  Alors $u_n^+ = \\max(u_n, 0) = 0$ et $u_n^- = \\max(-u_n, 0) = -u_n = |u_n| > 0$.<br>\n  Calculons :\n  $$ u_n^+ - u_n^- = 0 - (-u_n) = u_n $$\n  $$ u_n^+ + u_n^- = 0 + (-u_n) = |u_n| $$</li>\n</ul>\nDans tous les cas, nous avons démontré les deux identités :\n$$ u_n = u_n^+ - u_n^- \\quad \\text{et} \\quad |u_n| = u_n^+ + u_n^- \\quad \\blacksquare $$r"
            },
            {
              "title": "Étape 2 : Partie (2) & (3) — Encadrement et Convergence des Séries Positives",
              "content": "<p><strong>(2) Encadrements :</strong>\nPar définition du maximum avec $0$, on a immédiatement $u_n^+ \\ge 0$ et $u_n^- \\ge 0$.\nDe plus, d'après l'égalité $|u_n| = u_n^+ + u_n^-$ avec $u_n^\\pm \\ge 0$, il est clair que :\n$$ 0 \\le u_n^+ \\le |u_n| \\quad \\text{et} \\quad 0 \\le u_n^- \\le |u_n| $$\n<p><strong>(3) Convergence des séries :</strong>\nPar hypothèse, la série $\\sum_{n \\ge 0} u_n$ est absolument convergente, ce qui signifie que la série à termes positifs $\\sum_{n \\ge 0} |u_n|$ converge.\nPuisque $0 \\le u_n^+ \\le |u_n|$ et $0 \\le u_n^- \\le |u_n|$, par le critère de comparaison des séries à termes positifs :\n$$ \\text{Les deux séries à termes positifs } \\sum_{n \\ge 0} u_n^+ \\; \\text{ et } \\; \\sum_{n \\ge 0} u_n^- \\; \\mathbf{convergent}. $$r"
            },
            {
              "title": "Étape 3 : Partie (4) — Linéarité de la Somme et Piège des Séries Semi-Convergentes",
              "content": "<p>Puisque $\\sum u_n^+$ et $\\sum u_n^-$ sont deux séries convergentes dans $\\mathbb{R}$, par linéarité de l'opérateur somme :\n$$ \\sum_{n \\ge 0} u_n = \\sum_{n \\ge 0} (u_n^+ - u_n^-) = \\sum_{n \\ge 0} u_n^+ - \\sum_{n \\ge 0} u_n^- \\quad \\blacksquare $$\n<div class=\"theory-box tip\"><div class=\"theory-box-title\">Neden Şartlı Yakınsak (Semi-Convergente) Serilerde Bu Eşitlik Geçersizdir?</div><div class=\"theory-box-body\">\nEğer seri mutlak yakınsak değil de sadece şartlı yakınsak ise (örneğin $\\sum \\frac{(-1)^n}{n}$), hem pozitif parçaların toplamı hem de negatif parçaların toplamı $+\\infty$'a ıraksar :\n$$ \\sum_{n \\ge 1} u_n^+ = +\\infty \\quad \\text{et} \\quad \\sum_{n \\ge 1} u_n^- = +\\infty $$\nBu durumda $\\sum u_n^+ - \\sum u_n^- = +\\infty - \\infty$ tanımsızlığı (forme indéterminée) ortaya çıkar !\nİşte bu yüzden <em>Riemann Yeniden Düzenleme Teoremi (Théorème de réarrangement de Riemann)</em> geçerlidir: Şartlı yakınsak bir serinin terimlerinin sırasını değiştirerek toplamı İSTEDİĞİMİZ HERHANGİ BİR REEL SAYIYA eşitleyebiliriz!\n</div></div>r"
            }
          ]
        }
      ],
      "breadcrumb": "MAT201 > Modül 4 (TD 4) > Alterne Seriler & Genel Terimli",
      "concepts": [
        "critere_leibniz_series",
        "series_telescopiques_absolue",
        "suites_adjacentes_cauchy"
      ],
      "theoryPages": [
        {
          "title": "1. Mutlak Yakınsaklık vs Şartlı Yakınsaklık",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 4 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">İşareti Değişen Seriler & Yakınsaklık Türleri</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Mutlak Yakınsaklık (Convergence Absolue)</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer terimlerin mutlak değerlerinden oluşan $\\sum |u_n|$ serisi yakınsak ise, $\\sum u_n$ serisine <strong>mutlak yakınsaktır</strong> denir.</p>\n    <div style=\"background: rgba(37, 99, 235, 0.08); border-left: 3px solid var(--accent-blue); padding: 10px 14px; border-radius: 4px; margin-top: 8px;\">\n      <strong>Teorem:</strong> Mutlak yakınsak her seri yakınsaktır:\n      $$ \\sum |u_n| \\text{ converge} \\implies \\sum u_n \\text{ converge.} $$\n    </div>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Şartlı Yakınsaklık (Semi-convergence)</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer $\\sum u_n$ serisi yakınsak, fakat mutlak değer serisi $\\sum |u_n|$ <strong>ıraksak</strong> ise, bu seriye <strong>şartlı yakınsak (semi-convergente)</strong> denir.</p>\n    <p><em>Klasik Örnek:</em> Alterne harmonik seri $\\sum_{n=1}^{+\\infty} \\frac{(-1)^{n-1}}{n}$ şartlı yakınsaktır. Çünkü kendisi $\\ln 2$'ye yakınsar ama $|u_n| = 1/n$ harmonik serisi ıraksar.</p>\n  </div>\n</div>\n"
        },
        {
          "title": "2. Leibniz Alterne Seri Testi & Kalan Terim",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Leibniz Kriteri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Critère Spécial des Séries Alternées (CSSA) & Majoration du Reste</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Critère de Leibniz (Alterne Seri Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>$u_n = (-1)^n a_n$ (veya $(-1)^{n-1} a_n$) formundaki bir alterne seride eğer:</p>\n    <ol>\n      <li>Her $n$ için $a_n \\ge 0$ ise,</li>\n      <li>$(a_n)$ dizisi <strong>azalan (décroissante)</strong> ise ($a_{n+1} \\le a_n$),</li>\n      <li>$\\lim_{n\\to+\\infty} a_n = 0$ ise,</li>\n    </ol>\n    <p>O zaman $\\sum (-1)^n a_n$ serisi <strong>kesinlikle yakınsaktır</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Kalan Terim Sınırı (Majoration du Reste Alterné)</div>\n  <div class=\"theory-box-body\">\n    <p>Leibniz şartını sağlayan serilerde $N$. basamaktan sonraki kalan terim $R_N = \\sum_{n=N+1}^{+\\infty} u_n$ ihmal edilen ilk terimin işaretindedir ve mutlak değeri o terimi aşamaz:</p>\n    $$ |R_N| \\le a_{N+1} $$\n    <p>Bu özellik sayısal hesaplamalarda serinin toplamını belirli bir hata payıyla ($\u000barepsilon$) kestirmek için sınavda sıkça sorulur.</p>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Mutlak Yakınsaklık vs Şartlı Yakınsaklık</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 4 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">İşareti Değişen Seriler & Yakınsaklık Türleri</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Mutlak Yakınsaklık (Convergence Absolue)</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer terimlerin mutlak değerlerinden oluşan $\\sum |u_n|$ serisi yakınsak ise, $\\sum u_n$ serisine <strong>mutlak yakınsaktır</strong> denir.</p>\n    <div style=\"background: rgba(37, 99, 235, 0.08); border-left: 3px solid var(--accent-blue); padding: 10px 14px; border-radius: 4px; margin-top: 8px;\">\n      <strong>Teorem:</strong> Mutlak yakınsak her seri yakınsaktır:\n      $$ \\sum |u_n| \\text{ converge} \\implies \\sum u_n \\text{ converge.} $$\n    </div>\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Şartlı Yakınsaklık (Semi-convergence)</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer $\\sum u_n$ serisi yakınsak, fakat mutlak değer serisi $\\sum |u_n|$ <strong>ıraksak</strong> ise, bu seriye <strong>şartlı yakınsak (semi-convergente)</strong> denir.</p>\n    <p><em>Klasik Örnek:</em> Alterne harmonik seri $\\sum_{n=1}^{+\\infty} \\frac{(-1)^{n-1}}{n}$ şartlı yakınsaktır. Çünkü kendisi $\\ln 2$'ye yakınsar ama $|u_n| = 1/n$ harmonik serisi ıraksar.</p>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. Leibniz Alterne Seri Testi & Kalan Terim</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Leibniz Kriteri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Critère Spécial des Séries Alternées (CSSA) & Majoration du Reste</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Critère de Leibniz (Alterne Seri Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>$u_n = (-1)^n a_n$ (veya $(-1)^{n-1} a_n$) formundaki bir alterne seride eğer:</p>\n    <ol>\n      <li>Her $n$ için $a_n \\ge 0$ ise,</li>\n      <li>$(a_n)$ dizisi <strong>azalan (décroissante)</strong> ise ($a_{n+1} \\le a_n$),</li>\n      <li>$\\lim_{n\\to+\\infty} a_n = 0$ ise,</li>\n    </ol>\n    <p>O zaman $\\sum (-1)^n a_n$ serisi <strong>kesinlikle yakınsaktır</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Kalan Terim Sınırı (Majoration du Reste Alterné)</div>\n  <div class=\"theory-box-body\">\n    <p>Leibniz şartını sağlayan serilerde $N$. basamaktan sonraki kalan terim $R_N = \\sum_{n=N+1}^{+\\infty} u_n$ ihmal edilen ilk terimin işaretindedir ve mutlak değeri o terimi aşamaz:</p>\n    $$ |R_N| \\le a_{N+1} $$\n    <p>Bu özellik sayısal hesaplamalarda serinin toplamını belirli bir hata payıyla ($\u000barepsilon$) kestirmek için sınavda sıkça sorulur.</p>\n  </div>\n</div>\n</div>"
    },
    "seriler_mod5": {
      "id": "seriler_mod5",
      "title": "Modül 5: TD 5 - Sommes de Séries & Suites de Fonctions (Fonksiyon Dizileri I)",
      "shortTitle": "TD-5: Fonksiyon Dizileri I",
      "badge": "TD 5",
      "description": "Galatasaray Üniversitesi MAT201 TD 5 çalışma föyündeki 6 sorunun eksiksiz çözümü: Seri toplamı tuzağı, şartlı/mutlak yakınsak kombinasyonları, f_n(x)=x^n ve x^n(1-x) fonksiyon dizileri, suite test teknikleri ve kompakt segment teoremi.",
      "exercises": [
        {
          "id": "s5_ex1",
          "name": "TD 5 • Ex 1 : Somme de Deux Séries",
          "subtitle": "İki Serinin Toplamı ve Terim Terim Toplama Tuzağı",
          "tag": "TD 5",
          "concepts": [
            "series_telescopiques_absolue",
            "critere_leibniz_series"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Çok Önemli Teorem ve Uyarı : Seri Toplamında Lineerlik Sınırları</div><div class=\"theory-box-body\">\nSi deux séries $\\sum u_n$ et $\\sum v_n$ convergent, alors leur somme $\\sum (u_n + v_n)$ converge.<br>\n<strong>Mais attention :</strong> Si les termes tendent vers 0, on NE PEUT PAS en déduire que leur somme converge ! De plus, la somme d'une série convergente et d'une série divergente est <em>toujours strictement divergente</em>.\n</div></div>\n<strong>TD 5 • Exercice 1 :</strong><br>\nOn pose, pour tout entier $n \\ge 1$ :\n$$ u_n = \\frac{(-1)^n}{\\sqrt{n}} \\qquad \\text{et} \\qquad v_n = -\\frac{(-1)^n}{\\sqrt{n}} + \\frac{1}{n} $$\n(1) Montrer que la série $\\sum u_n$ converge conditionnellement.<br>\n(2) Étudier la convergence de la série $\\sum v_n$.<br>\n(3) Étudier la convergence de la série $\\sum (u_n + v_n)$.<br>\n(4) Que montre cet exemple sur l'addition de deux séries dont les termes généraux tendent vers zéro ?r",
          "hint": "$u_n$ Leibniz ile yakınsar ama $|u_n| = 1/\\sqrt{n}$ Riemann $\\alpha = 1/2 \\le 1$ ile ıraksar. $v_n = -u_n + 1/n$ olduğundan $u_n + v_n = 1/n$ harmonik serisi kalır!",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Convergence Conditionnelle de ∑ u_n",
              "content": "<p>Le terme général est $u_n = (-1)^n a_n$ avec $a_n = \\frac{1}{\\sqrt{n}}$.\n<ul>\n  <li>$a_n > 0$ pour tout $n \\ge 1$.</li>\n  <li>$(a_n)$ est strictement décroissante car $n+1 > n \\implies \\frac{1}{\\sqrt{n+1}} < \\frac{1}{\\sqrt{n}}$.</li>\n  <li>$\\lim_{n \\to +\\infty} a_n = \\lim_{n \\to +\\infty} \\frac{1}{\\sqrt{n}} = 0$.</li>\n</ul>\nD'après le critère de Leibniz, la série $\\sum u_n$ <strong>converge</strong>.\n<p>Étudions la convergence absolue :\n$$ |u_n| = \\frac{1}{\\sqrt{n}} = \\frac{1}{n^{1/2}} $$\nC'est une série de Riemann avec $\\alpha = \\frac{1}{2} \\le 1$, donc divergente.\nLa série $\\sum u_n$ n'est pas absolument convergente : elle <strong>converge conditionnellement (semi-convergente)</strong>.r"
            },
            {
              "title": "Étape 2 : Partie (2) — Divergence de la Série ∑ v_n",
              "content": "<p>Exprimons la relation entre $u_n$ et $v_n$ :\n$$ v_n = -u_n + \\frac{1}{n} \\iff \\frac{1}{n} = u_n + v_n $$\nRaisonner par l'absurde : supposons que la série $\\sum v_n$ converge.\nPuisque la série $\\sum u_n$ converge (étape 1), la somme de ces deux séries convergentes $\\sum (u_n + v_n)$ devrait converger par linéarité.\nOr :\n$$ u_n + v_n = \\frac{(-1)^n}{\\sqrt{n}} + \\left(-\\frac{(-1)^n}{\\sqrt{n}} + \\frac{1}{n}\\right) = \\frac{1}{n} $$\nLa série $\\sum (u_n + v_n) = \\sum \\frac{1}{n}$ est la série harmonique, qui diverge vers $+\\infty$.\nContradiction majeure !\nPar conséquent, la série $\\sum v_n$ <strong>est nécessairement divergente</strong>.r"
            },
            {
              "title": "Étape 3 : Partie (3) & (4) — Analyse de ∑ (u_n + v_n) & Enseignement Fondamental",
              "content": "<p><strong>(3) Convergence de $\\sum (u_n + v_n)$ :</strong>\nComme calculé à l'étape 2, $u_n + v_n = \\frac{1}{n}$ pour tout $n \\ge 1$.\nLa série $\\sum (u_n + v_n) = \\sum_{n=1}^{+\\infty} \\frac{1}{n}$ est la série harmonique, elle <strong>diverge vers $+\\infty$</strong>.\n<p><strong>(4) Enseignement de cet exemple :</strong>\nCet exemple met en garde contre deux pièges classiques de l'analyse :\n<ol>\n  <li>Bien que $\\lim_{n \\to +\\infty} u_n = 0$ et $\\lim_{n \\to +\\infty} v_n = 0$, la série somme $\\sum (u_n + v_n)$ diverge ! Avoir des termes tendant vers zéro ne suffit jamais.</li>\n  <li>L'addition d'une série convergente ($\\sum u_n$) et d'une série divergente ($\\sum v_n$) donne TOUJOURS une série divergente ($\\sum (u_n + v_n)$). ■</li>\n</ol>r"
            }
          ]
        },
        {
          "id": "s5_ex2",
          "name": "TD 5 • Ex 2 : Convergence Absolue / Conditionnelle",
          "subtitle": "Mutlak ve Şartlı Yakınsak Serilerin Kombinasyonu",
          "tag": "TD 5",
          "concepts": [
            "series_telescopiques_absolue",
            "critere_leibniz_series"
          ],
          "enonce": "<strong>TD 5 • Exercice 2 :</strong><br>\nÉtudier la nature des séries suivantes. Lorsqu'une série converge, préciser si sa convergence est absolue ou conditionnelle :\n$$ (a) \\quad \\sum_{n \\ge 1} \\frac{(-1)^n}{3n-2} $$\n$$ (b) \\quad \\sum_{n \\ge 1} \\left( \\frac{(-1)^n}{n} + \\frac{1}{n^2} \\right) $$\n$$ (c) \\quad \\sum_{n \\ge 1} \\left( \\frac{(-1)^n}{n} + \\frac{(-1)^{n+1}}{n+2} + \\frac{1}{n^2} \\right) $$\n(1) Étudier séparément les séries intervenant dans les expressions (b) et (c).<br>\n(2) Peut-on obtenir une série absolument convergente en additionnant deux séries conditionnellement convergentes ?r",
          "hint": "(a) Leibniz ile yakınsar, harmonik denklikle şartlı. (b) Şartlı + Mutlak = Şartlı. (c) $\\frac{(-1)^n}{n} + \\frac{(-1)^{n+1}}{n+2} = (-1)^n (\\frac{1}{n} - \\frac{1}{n+2}) = \\frac{2(-1)^n}{n(n+2)} = O(1/n^2)$. İki şartlı serinin toplamı MUTLAK yakınsak bir seri üretebilir!",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Étude de la Série (a)",
              "content": "<p>Soit $u_n = \\frac{(-1)^n}{3n-2}$.\n- C'est une série alternée avec $a_n = \\frac{1}{3n-2} > 0$.\n- La suite $(a_n)$ est strictement décroissante : $3(n+1)-2 = 3n+1 > 3n-2 \\implies a_{n+1} < a_n$.\n- $\\lim_{n \\to +\\infty} a_n = 0$.\nD'après le critère de Leibniz, la série converge.\n<p>Pour la convergence absolue :\n$$ |u_n| = \\frac{1}{3n-2} \\sim \\frac{1}{3n} $$\nComme la série $\\frac{1}{3} \\sum \\frac{1}{n}$ diverge (harmonique), par équivalence des séries positives, $\\sum |u_n|$ diverge.\nLa série (a) est donc <strong>conditionnellement convergente (semi-convergente)</strong>.r"
            },
            {
              "title": "Étape 2 : Étude de la Série (b)",
              "content": "<p>Le terme général est $v_n = \\frac{(-1)^n}{n} + \\frac{1}{n^2}$.\nC'est la somme de deux séries :\n<ul>\n  <li>$\\sum \\frac{(-1)^n}{n}$ converge d'après le critère de Leibniz (semi-convergente).</li>\n  <li>$\\sum \\frac{1}{n^2}$ converge d'après la règle des séries de Riemann ($\\alpha = 2 > 1$, absolument convergente).</li>\n</ul>\nPar linéarité de la somme des séries convergentes, la série $\\sum v_n$ converge.\n<p>Convergence absolue : pour tout $n \\ge 2$ :\n$$ |v_n| = \\left| \\frac{(-1)^n}{n} + \\frac{1}{n^2} \\right| \\ge \\frac{1}{n} - \\frac{1}{n^2} $$\nComme $\\sum \\frac{1}{n}$ diverge et $\\sum \\frac{1}{n^2}$ converge, la série minorante $\\sum \\left(\\frac{1}{n} - \\frac{1}{n^2}\\right)$ diverge vers $+\\infty$.\nPar comparaison, $\\sum |v_n|$ diverge.\nLa série (b) est donc <strong>conditionnellement convergente</strong>.r"
            },
            {
              "title": "Étape 3 : Étude de la Série (c) & Partie (1)",
              "content": "<p>Regroupons les deux premiers termes du terme général :\n$$ w_n = \\left( \\frac{(-1)^n}{n} + \\frac{(-1)^{n+1}}{n+2} \\right) + \\frac{1}{n^2} $$\nComme $(-1)^{n+1} = -(-1)^n$, nous pouvons factoriser par $(-1)^n$ :\n$$ \\frac{(-1)^n}{n} + \\frac{(-1)^{n+1}}{n+2} = (-1)^n \\left( \\frac{1}{n} - \\frac{1}{n+2} \\right) = (-1)^n \\frac{(n+2) - n}{n(n+2)} = \\frac{2(-1)^n}{n(n+2)} $$\nLe terme général $w_n$ s'écrit donc :\n$$ w_n = \\frac{2(-1)^n}{n(n+2)} + \\frac{1}{n^2} $$\nMajorer la valeur absolue pour tout $n \\ge 1$ :\n$$ |w_n| \\le \\frac{2}{n(n+2)} + \\frac{1}{n^2} \\le \\frac{2}{n^2} + \\frac{1}{n^2} = \\frac{3}{n^2} $$\nComme $\\sum \\frac{3}{n^2} = 3 \\sum \\frac{1}{n^2}$ est une série de Riemann convergente ($\\alpha = 2 > 1$), par comparaison de séries positives :\nLa série des valeurs absolues $\\sum |w_n|$ <strong>converge</strong>.\nLa série (c) est donc <strong>ABSOLUMENT CONVERGENTE</strong> !r"
            },
            {
              "title": "Étape 4 : Partie (2) — Somme de Deux Séries Semi-Convergentes",
              "content": "<p><strong>OUI, absolument !</strong>\nOn peut parfaitement obtenir une série absolument convergente en additionnant deux séries conditionnellement convergentes.\nL'exemple (c) en est la démonstration éclatante :\n<ul>\n  <li>$S_A = \\sum_{n \\ge 1} \\frac{(-1)^n}{n}$ est conditionnellement convergente.</li>\n  <li>$S_B = \\sum_{n \\ge 1} \\frac{(-1)^{n+1}}{n+2}$ est conditionnellement convergente.</li>\n</ul>\nPourtant, leur somme $S_A + S_B = \\sum_{n \\ge 1} \\frac{2(-1)^n}{n(n+2)}$ a un terme général en $O\\left(\\frac{1}{n^2}\\right)$, ce qui rend la série <strong>absolument convergente</strong> ! (Leurs parties divergentes harmoniques d'ordre $1/n$ se sont exactement compensées et annulées). ■r"
            }
          ]
        },
        {
          "id": "s5_ex3",
          "name": "TD 5 • Ex 3 : Convergence Simple / Uniforme de f_n(x) = xⁿ",
          "subtitle": "Tanım Kümesinin Düzgün Yakınsaklığa Etkisi ([0, 1], [0, 1[ ve [0, a])",
          "tag": "TD 5",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Basit ve Düzgün Yakınsaklık (Convergence Simple & Uniforme)</div><div class=\"theory-box-body\">\nSoit $(f_n)$ une suite de fonctions définies sur $D$.\n<ul>\n  <li><strong>Convergence simple :</strong> Pour chaque $x \\in D$ fixé, la suite numérique $(f_n(x))$ converge vers $f(x)$.</li>\n  <li><strong>Convergence uniforme :</strong> $\\|f_n - f\\|_\\infty = \\sup_{x \\in D} |f_n(x) - f(x)| \\xrightarrow[n \\to +\\infty]{} 0$.</li>\n  <li><strong>Théorème de continuité :</strong> Si chaque $f_n$ est continue sur $D$ et si $(f_n)$ converge uniformément vers $f$ sur $D$, alors la limite $f$ est <strong>continue</strong> sur $D$.</li>\n</ul>\n</div></div>\n<strong>TD 5 • Exercice 3 :</strong><br>\nPour $n \\ge 1$, on considère la fonction $f_n : [0, 1] \\to \\mathbb{R}$ définie par $f_n(x) = x^n$.<br>\n(1) Déterminer la limite simple $f$ de la suite $(f_n)$ sur $[0, 1]$.<br>\n(2) La convergence est-elle uniforme sur $[0, 1]$ ? Justifier par le théorème de continuité.<br>\n(3) Soit $a \\in ]0, 1[$. Montrer que $(f_n)$ converge uniformément vers 0 sur $[0, a]$.<br>\n(4) La suite $(f_n)$ converge-t-elle uniformément vers 0 sur $[0, 1[$ ? Calculer $\\sup_{x \\in [0, 1[} |f_n(x) - f(x)|$.<br>\n(5) Comparer les résultats obtenus sur $[0, 1]$, $[0, 1[$ et $[0, a]$. Que peut-on en conclure sur le rôle du domaine dans la convergence uniforme ?r",
          "hint": "Limit fonksiyonu $x=1$'de 1, diğer her yerde 0'dır (süreksiz). Süreksizlik tek başına $[0, 1]$'de düzgün yakınsaklığı çürütür. $[0, 1[$ aralığında ise fonksiyon 0'dır ama $\\sup x^n = 1 \\not\\to 0$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Calcul de la Limite Simple",
              "content": "<p>Soit $x \\in [0, 1]$ fixé :\n<ul>\n  <li>Si $x \\in [0, 1[$, alors $|x| < 1$, donc la suite géométrique vérifie $\\lim_{n \\to +\\infty} x^n = 0$.</li>\n  <li>Si $x = 1$, alors pour tout $n \\ge 1$, $f_n(1) = 1^n = 1$, donc $\\lim_{n \\to +\\infty} f_n(1) = 1$.</li>\n</ul>\nLa suite $(f_n)$ converge donc simplement sur $[0, 1]$ vers la fonction discontinue $f$ définie par :\n$$ f(x) = \\\\begin{cases} 0 & \\\\text{si } x \\\\in [0, 1[ \\\\\\\\ 1 & \\\\text{si } x = 1 \\\\end{cases} $$r"
            },
            {
              "title": "Étape 2 : Partie (2) — Réfutation de la Convergence Uniforme sur [0, 1]",
              "content": "<p>Raisonnons par le <strong>théorème de continuité de la limite uniforme</strong> :\n- Pour tout $n \\ge 1$, la fonction $f_n : x \\mapsto x^n$ est une fonction polynomiale, donc continue sur $[0, 1]$.\n- La fonction limite simple $f$ présente une discontinuité en $x = 1$ :\n$$ \\lim_{x \\to 1^-} f(x) = 0 \\ne f(1) = 1 $$\nSi la convergence était uniforme sur $[0, 1]$, la fonction limite $f$ devrait obligatoirement être continue sur $[0, 1]$.\nPar contraposée du théorème de continuité, <strong>la suite $(f_n)$ NE CONVERGE PAS uniformément vers $f$ sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 3 : Partie (3) — Convergence Uniforme sur le Compact [0, a]",
              "content": "<p>Soit $a \\in ]0, 1[$ fixé.\nSur le sous-ensemble $[0, a]$, la fonction limite simple est $f(x) = 0$.\nCalculons la norme de la convergence uniforme :\n$$ \\|f_n - f\\|_{\\infty, [0, a]} = \\sup_{x \\in [0, a]} |x^n - 0| = \\sup_{x \\in [0, a]} x^n $$\nPuisque la fonction $x \\mapsto x^n$ est strictement croissante et positive sur $[0, a]$, son supremum est atteint au bord supérieur $x = a$ :\n$$ \\sup_{x \\in [0, a]} x^n = a^n $$\nComme $0 \\le a < 1$, la suite géométrique $a^n$ tend vers 0 quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\|f_n - f\\|_{\\infty, [0, a]} = \\lim_{n \\to +\\infty} a^n = 0 $$\nPar conséquent, la suite $(f_n)$ <strong>converge uniformément vers 0 sur $[0, a]$</strong>.r"
            },
            {
              "title": "Étape 4 : Partie (4) — Non-Convergence Uniforme sur [0, 1[",
              "content": "<p>Sur l'intervalle ouvert à droite $[0, 1[$, la fonction limite simple est $f(x) = 0$ (qui est cette fois continue !).\nCalculons la borne supérieure de l'écart sur $[0, 1[$ :\n$$ \\|f_n - f\\|_{\\infty, [0, 1[} = \\sup_{x \\in [0, 1[} |x^n - 0| = \\sup_{x \\in [0, 1[} x^n = \\lim_{x \\to 1^-} x^n = 1 $$\nLa quantité $\\|f_n - f\\|_\\infty = 1$ est strictement constante pour tout entier $n \\ge 1$ !\nElle ne tend pas vers 0 :\n$$ \\lim_{n \\to +\\infty} \\|f_n - f\\|_{\\infty, [0, 1[} = 1 \\ne 0 $$\nLa suite $(f_n)$ <strong>ne converge pas uniformément vers 0 sur $[0, 1[$</strong>.r"
            },
            {
              "title": "Étape 5 : Partie (5) — Rôle Fondamental du Domaine",
              "content": "<p><strong>Synthèse pédagogique sur le rôle du domaine :</strong>\n<ul>\n  <li>Sur $[0, 1]$, le blocage vient de la discontinuité de la limite au point $x = 1$.</li>\n  <li>Sur $[0, 1[$, bien que la limite soit continue ($f=0$), la convergence n'est pas uniforme car la borne supérieure 'glisse' vers 1 près de la frontière ouverte ($x \\to 1^-$).</li>\n  <li>Sur $[0, a]$ avec $a < 1$, on s'éloigne strictement de la frontière pathologique : le supremum est bloqué à $a^n \\to 0$, restaurant la convergence uniforme.</li>\n</ul>\n<strong>Règle d'or :</strong> La convergence uniforme dépend intrinsèquement de la géométrie et de la compacité du domaine d'étude. ■r"
            }
          ]
        },
        {
          "id": "s5_ex4",
          "name": "TD 5 • Ex 4 : Convergence Simple / Uniforme de f_n(x) = xⁿ(1-x)",
          "subtitle": "Sınır Etkisinin Düzenlenmesi ve Düzgün Yakınsaklık Kurtarımı",
          "tag": "TD 5",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<strong>TD 5 • Exercice 4 :</strong><br>\nPour $n \\ge 1$, on considère la fonction $f_n : [0, 1] \\to \\mathbb{R}$ définie par :\n$$ f_n(x) = x^n (1 - x) $$\n(1) Déterminer la limite simple de la suite $(f_n)$ sur $[0, 1]$.<br>\n(2) En utilisant l'identité algébrique $1 - x^{n+1} = (1 - x)(1 + x + x^2 + \\dots + x^n)$, montrer que pour tout $x \\in [0, 1]$ :\n$$ 0 \\le f_n(x) \\le \\frac{1}{n+1} $$\n(3) En déduire que la suite $(f_n)$ converge uniformément vers 0 sur $[0, 1]$.<br>\n(4) Comparer ce résultat avec celui obtenu à l'exercice précédent pour $g_n(x) = x^n$.r",
          "hint": "Cebirsel özdeşlikte $x \\in [0, 1]$ için her terim $x^k \\ge x^n$ olduğundan parantez içi $(n+1)x^n$'den büyüktür. Böylece $(1-x)(n+1)x^n \\le 1-x^{n+1} \\le 1 \\implies f_n(x) \\le \\frac{1}{n+1}$. Supremum $1/(n+1) \\to 0$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Limite Simple sur [0, 1]",
              "content": "<p>Soit $x \\in [0, 1]$ fixé :\n<ul>\n  <li>Si $x \\in [0, 1[$, alors $\\lim_{n \\to +\\infty} x^n = 0$, donc $\\lim_{n \\to +\\infty} f_n(x) = 0 \\times (1-x) = 0$.</li>\n  <li>Si $x = 1$, alors pour tout $n \\ge 1$, $1 - x = 1 - 1 = 0$, donc $f_n(1) = 1^n \\times 0 = 0$.</li>\n</ul>\nDans tous les cas, la limite simple est la fonction identiquement nulle :\n$$ f(x) = 0 \\quad \\text{pour tout } x \\in [0, 1] $$r"
            },
            {
              "title": "Étape 2 : Partie (2) — Majoration Algébrique Fondamentale",
              "content": "<p>Pour tout $x \\in [0, 1]$, on a $x^n \\ge 0$ et $1-x \\ge 0$, donc $f_n(x) \\ge 0$.\nRappelons l'identité de factorisation :\n$$ 1 - x^{n+1} = (1 - x)(1 + x + x^2 + \\dots + x^n) $$\nPour tout $x \\in [0, 1]$ et pour tout entier $k \\in \\{0, 1, \\dots, n\\}$, puisque $k \\le n$, on a :\n$$ x^k \\ge x^n $$\nPar conséquent, la somme des $n+1$ termes vérifie :\n$$ 1 + x + x^2 + \\dots + x^n = \\sum_{k=0}^n x^k \\ge \\sum_{k=0}^n x^n = (n+1) x^n $$\nMultiplions cette inégalité par $(1-x) \\ge 0$ :\n$$ 1 - x^{n+1} \\ge (1 - x) (n+1) x^n = (n+1) f_n(x) $$\nD'autre part, comme $x \\in [0, 1]$, $x^{n+1} \\ge 0 \\implies 1 - x^{n+1} \\le 1$.\nNous obtenons ainsi la chaîne d'inégalités :\n$$ (n+1) f_n(x) \\le 1 - x^{n+1} \\le 1 \\implies f_n(x) \\le \\frac{1}{n+1} $$\nD'où l'encadrement uniforme valable pour tout $x \\in [0, 1]$ :\n$$ 0 \\le f_n(x) \\le \\frac{1}{n+1} \\quad \\blacksquare $$r"
            },
            {
              "title": "Étape 3 : Partie (3) — Déduction de la Convergence Uniforme",
              "content": "<p>Puisque la majoration obtenue à l'étape 2 est <em>totalement indépendante de $x$</em> sur tout le segment $[0, 1]$ :\n$$ \\sup_{x \\in [0, 1]} |f_n(x) - 0| \\le \\frac{1}{n+1} $$\nPassons à la limite quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| \\le \\lim_{n \\to +\\infty} \\frac{1}{n+1} = 0 $$\nPar conséquent, <strong>la suite $(f_n)$ converge uniformément vers la fonction nulle sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 4 : Partie (4) — Comparaison avec g_n(x) = xⁿ",
              "content": "<p>Pour $g_n(x) = x^n$, la convergence n'était pas uniforme sur $[0, 1]$ car les courbes se redressaient abruptement vers 1 au voisinage immédiat de $x = 1$.\nIci, la présence du facteur régulateur $(1 - x)$ <strong>force la fonction à s'annuler exactement en $x = 1$</strong> pour tout $n$.\nCe facteur amortit l'élévation près de 1 et rabat le pic vers 0 avec une hauteur maximale d'au plus $\\frac{1}{n+1} \\to 0$.\nCela montre comment un facteur géométrique d'écrasement au bord peut transformer une convergence non uniforme en une <strong>convergence uniforme parfaite sur le compact tout entier</strong>. ■r"
            }
          ]
        },
        {
          "id": "s5_ex5",
          "name": "TD 5 • Ex 5 : Suites Tests pour la Non-Convergence Uniforme",
          "subtitle": "Test Dizisi (Suite Test) ile Düzgün Yakınsaklığın Çürütülmesi",
          "tag": "TD 5",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Sınav Metodu : Suite Test ile Düzgün Yakınsaklığı Çürütme</div><div class=\"theory-box-body\">\nPour montrer qu'une suite de fonctions $(f_n)$ <strong>ne converge pas uniformément</strong> vers $f$ sur $D$, il suffit de trouver une suite de points $(x_n)_{n \\ge 1}$ du domaine $D$ telle que :\n$$ |f_n(x_n) - f(x_n)| \\not\\xrightarrow[n \\to +\\infty]{} 0 $$\n</div></div>\n<strong>TD 5 • Exercice 5 :</strong><br>\nPour chacune des suites de fonctions suivantes : (1) déterminer la limite simple, (2) étudier la convergence uniforme, (3) lorsque la convergence n'est pas uniforme, trouver une suite $(x_n)$ de points du domaine prouvant la non-uniformité :\n$$ (a) \\quad f_n(x) = \\frac{x}{n}, \\quad x \\in [0, 1] \\qquad (b) \\quad f_n(x) = \\frac{x}{n}, \\quad x \\in [0, +\\infty[ $$\n$$ (c) \\quad f_n(x) = \\frac{x^n}{1+x^n}, \\quad x \\in [0, 1] \\qquad (d) \\quad f_n(x) = \\frac{nx}{1+n^2 x^2}, \\quad x \\in [0, 1] $$r",
          "hint": "(a) $[0, 1]$ kapalı ve sınırlı olduğundan $\\sup = 1/n \\to 0$ (düzgün). (b) Sınırsız kümede $x_n = n$ alırsak $f_n(n) = 1 \\not\\to 0$. (c) Discontinuité en 1. (d) Tepe noktası türevle $x_n = 1/n \\implies f_n(1/n) = 1/2 \\not\\to 0$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Cas (a) — f_n(x) = x/n sur [0, 1]",
              "content": "<p><strong>(1) Limite simple :</strong> Pour chaque $x \\in [0, 1]$ fixé, $\\lim_{n \\to +\\infty} \\frac{x}{n} = 0$. Donc la limite simple est $f(x) = 0$.\n<p><strong>(2) Convergence uniforme :</strong>\n$$ \\|f_n - f\\|_\\infty = \\sup_{x \\in [0, 1]} \\left| \\frac{x}{n} - 0 \\right| = \\sup_{x \\in [0, 1]} \\frac{x}{n} = \\frac{1}{n} $$\nPuisque $\\lim_{n \\to +\\infty} \\frac{1}{n} = 0$, la suite $(f_n)$ <strong>converge uniformément</strong> vers 0 sur $[0, 1]$.r"
            },
            {
              "title": "Étape 2 : Cas (b) — f_n(x) = x/n sur [0, +∞[",
              "content": "<p><strong>(1) Limite simple :</strong> Pour tout $x \\in [0, +\\infty[$ fixé, $\\lim_{n \\to +\\infty} \\frac{x}{n} = 0$. La limite simple est toujours $f(x) = 0$.\n<p><strong>(2) Non-convergence uniforme :</strong>\n$$ \\sup_{x \\in [0, +\\infty[} \\frac{x}{n} = +\\infty \\ne 0 $$\n<p><strong>(3) Suite test explicite :</strong>\nPosons la suite de points $x_n = n \\in [0, +\\infty[$.\nCalculons la valeur :\n$$ |f_n(x_n) - f(x_n)| = f_n(n) = \\frac{n}{n} = 1 $$\nComme $\\lim_{n \\to +\\infty} 1 = 1 \\ne 0$, la suite $(f_n)$ <strong>ne converge pas uniformément</strong> vers 0 sur $[0, +\\infty[$.r"
            },
            {
              "title": "Étape 3 : Cas (c) — f_n(x) = xⁿ / (1 + xⁿ) sur [0, 1]",
              "content": "<p><strong>(1) Limite simple :</strong>\n- Si $x \\in [0, 1[$, $x^n \\to 0$, d'où $f_n(x) = \\frac{x^n}{1+x^n} \\to \\frac{0}{1+0} = 0$.\n- Si $x = 1$, $f_n(1) = \\frac{1}{1+1} = \\frac{1}{2}$.\nLa limite simple est discontinue en $x=1$ ($f(x)=0$ sur $[0, 1[$ et $f(1)=1/2$).\n<p><strong>(2) Non-convergence uniforme :</strong>\nChaque $f_n$ est continue, mais $f$ est discontinue en 1. Donc la convergence n'est pas uniforme.\n<p><strong>(3) Suite test explicite :</strong>\nCherchons $x_n \\in [0, 1[$ tel que $x_n^n = 1/2$, soit $x_n = (1/2)^{1/n} \\in [0, 1[$.\nPuisque $x_n < 1$, on a $f(x_n) = 0$. Alors :\n$$ |f_n(x_n) - f(x_n)| = \\frac{1/2}{1 + 1/2} = \\frac{1/2}{3/2} = \\frac{1}{3} $$\nComme $\\lim_{n \\to +\\infty} \\frac{1}{3} = \\frac{1}{3} \\ne 0$, la convergence n'est pas uniforme.r"
            },
            {
              "title": "Étape 4 : Cas (d) — f_n(x) = nx / (1 + n² x²) sur [0, 1]",
              "content": "<p><strong>(1) Limite simple :</strong>\n- Pour $x = 0$ : $f_n(0) = 0 \\to 0$.\n- Pour $x \\in ]0, 1]$ : $f_n(x) = \\frac{nx}{1 + n^2 x^2} \\sim \\frac{nx}{n^2 x^2} = \\frac{1}{nx} \\xrightarrow[n \\to +\\infty]{} 0$.\nLa limite simple est $f(x) = 0$ sur tout $[0, 1]$ (fonction continue !).\n<p><strong>(2) & (3) Non-convergence uniforme & Suite test :</strong>\nÉtudions le maximum de $f_n$ en dérivant :\n$$ f_n'(x) = \\frac{n(1 + n^2 x^2) - nx(2n^2 x)}{(1 + n^2 x^2)^2} = \\frac{n(1 - n^2 x^2)}{(1 + n^2 x^2)^2} $$\nLa dérivée s'annule sur $[0, 1]$ au point $x_n = \\frac{1}{n} \\in [0, 1]$.\nPosons cette suite test $x_n = \\frac{1}{n}$ :\n$$ |f_n(x_n) - f(x_n)| = f_n\\left(\\frac{1}{n}\\right) = \\frac{n \\times \\frac{1}{n}}{1 + n^2 \\times \\frac{1}{n^2}} = \\frac{1}{1 + 1} = \\frac{1}{2} $$\nLa quantité reste bloquée à $\\frac{1}{2}$ pour tout $n \\ge 1$ !\n$$ \\sup_{x \\in [0, 1]} |f_n(x) - 0| = \\frac{1}{2} \\xrightarrow[n \\to +\\infty]{} \\frac{1}{2} \\ne 0 $$\nLa suite $(f_n)$ <strong>ne converge pas uniformément</strong> sur $[0, 1]$ (phénomène de bosse glissante). ■r"
            }
          ]
        },
        {
          "id": "s5_ex6",
          "name": "TD 5 • Ex 6 : Questions de Réflexion sur les Domaines",
          "subtitle": "Alt Kümeler ve Kompakt Segmentlerde Düzgün Yakınsaklık",
          "tag": "TD 5",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<strong>TD 5 • Exercice 6 :</strong><br>\nSoit $(f_n)$ une suite de fonctions qui converge uniformément vers $f$ sur un ensemble $D$.<br>\n(1) Si $A \\subset D$, la convergence de $(f_n)$ vers $f$ est-elle nécessairement uniforme sur $A$ ? Justifier rigoureusement.<br>\n(2) Supposons maintenant que $(f_n)$ converge uniformément vers $f$ sur tout segment contenu dans $D$. Peut-on en déduire que $(f_n)$ converge uniformément vers $f$ sur $D$ ?<br>\n(3) Donner un contre-exemple explicite.r",
          "hint": "(1) Alt kümedeki supremum tüm kümedeki supremumdan küçük veya eşittir (doğru). (2) Parçalarda düzgün olması kümenin tamamında düzgün olmasını gerektirmez (yanlış, karşıt örnek $x^n$ veya $x/n$).",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Restriction à un Sous-Ensemble A ⊂ D",
              "content": "<p><strong>OUI, la convergence est nécessairement uniforme sur toute partie $A \\subset D$.</strong>\n<p><strong>Démonstration :</strong>\nSoit $A \\subset D$.\nPar propriété fondamentale de la borne supérieure : si $A \\subset D$, alors pour toute fonction bornée $g$, $\\sup_{x \\in A} g(x) \\le \\sup_{x \\in D} g(x)$.\nEn appliquant ceci à la fonction écart $|f_n(x) - f(x)|$ :\n$$ \\forall n \\in \\mathbb{N}, \\quad 0 \\le \\sup_{x \\in A} |f_n(x) - f(x)| \\le \\sup_{x \\in D} |f_n(x) - f(x)| $$\nPar hypothèse, $(f_n)$ converge uniformément vers $f$ sur $D$, ce qui signifie :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in D} |f_n(x) - f(x)| = 0 $$\nD'après le théorème des gendarmes, nous obtenons immédiatement :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in A} |f_n(x) - f(x)| = 0 $$\nLa suite $(f_n)$ converge donc uniformément vers $f$ sur la partie $A$.r"
            },
            {
              "title": "Étape 2 : Parties (2) et (3) — Convergence Uniforme Locale vs Globale & Contre-Exemple",
              "content": "<p><strong>(2) NON, la réciproque est FAUSSE en général.</strong>\nLe fait qu'une suite converge uniformément sur tout segment compact contenu dans $D$ n'implique absolument pas qu'elle converge uniformément sur $D$ tout entier.\n<p><strong>(3) Deux contre-exemples classiques à connaître par cœur pour l'examen :</strong>\n<ul>\n  <li><strong>Contre-exemple 1 (Domaine borné ouvert) :</strong>\n  Considérons $f_n(x) = x^n$ sur $D = [0, 1[$.\n  Tout segment inclus dans $[0, 1[$ est contenu dans un segment de la forme $[0, a]$ avec $0 < a < 1$.\n  D'après l'exercice 3, $(f_n)$ converge uniformément vers 0 sur tout $[0, a]$ car $\\sup_{[0, a]} x^n = a^n \\to 0$.\n  Pourtant, sur $D = [0, 1[$, $\\sup_{x \\in [0, 1[} x^n = 1 \\not\\to 0$ : la convergence N'EST PAS uniforme sur $D$.</li>\n  <li><strong>Contre-exemple 2 (Domaine non borné) :</strong>\n  Considérons $f_n(x) = \\frac{x}{n}$ sur $D = [0, +\\infty[$.\n  Sur tout segment $[a, b] \\subset [0, +\\infty[$, on a $\\sup_{x \\in [a, b]} \\frac{x}{n} = \\frac{b}{n} \\xrightarrow[n \\to +\\infty]{} 0$ (la convergence est uniforme sur tout segment).\n  Pourtant, sur tout $D = [0, +\\infty[$, la convergence n'est pas uniforme (exercice 5b).</li>\n</ul>\nCes contre-exemples démontrent l'importance capitale de distinguer la <em>convergence uniforme locale (sur les compacts)</em> de la <em>convergence uniforme globale</em>. ■r"
            }
          ]
        }
      ],
      "breadcrumb": "MAT201 > Modül 5 (TD 5) > Fonksiyon Dizileri I",
      "concepts": [
        "convergence_uniforme_sup",
        "continuite_uniforme"
      ],
      "theoryPages": [
        {
          "title": "1. Noktasal Yakınsaklık vs Düzgün Yakınsaklık",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 5 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Fonksiyon Dizileri: Convergence Simple vs Convergence Uniforme</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Noktasal Yakınsaklık (Convergence Simple - CVS)</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $(f_n)$ fonksiyon dizisi bir $D$ kümesinde $f$ fonksiyonuna <strong>noktasal yakınsar</strong> $\\iff$ her sabit $x \\in D$ için reel sayı dizisi $f_n(x) \to f(x)$ oluyorsa:</p>\n    $$ \\forall x \\in D, \\quad \\lim_{n\\to+\\infty} f_n(x) = f(x). $$\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Düzgün Yakınsaklık (Convergence Uniforme - CVU)</div>\n  <div class=\"theory-box-body\">\n    <p>$(f_n)$ dizisi $D$ üzerinde $f$'e <strong>düzgün yakınsar</strong> $\\iff$ aralarındaki maksimum (supremum) mesafe $0$'a gidiyorsa:</p>\n    $$ \\|f_n - f\\|_\\infty = \\sup_{x\\in D} |f_n(x) - f(x)| \\xrightarrow[n\\to+\\infty]{} 0. $$\n    <p><strong>Geometrik Anlamı:</strong> $f$'in etrafına çizilen her $\\varepsilon$-tüpü içine, yeterince büyük $n$'ler için fonksiyon grafiğinin <em>tamamı</em> girer.</p>\n  </div>\n</div>\n"
        },
        {
          "title": "2. Sürekliliğin Korunması & Düzgün Yakınsaklığı Çürütme",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Sınav Stratejisi</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Théorème de Continuité & Test Dizisi (Suite Test) Yöntemi</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Théorème de Continuité de la Limite</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer her $f_n$ fonksiyonu $D$ üzerinde <strong>sürekli</strong> ise ve $(f_n)$, $f$'e $D$ üzerinde <strong>düzgün yakınsıyorsa</strong>, o zaman limit fonksiyonu $f$ de $D$ üzerinde <strong>kesinlikle süreklidir</strong>.</p>\n    <div style=\"background: rgba(239, 68, 68, 0.08); border-left: 3px solid var(--accent-rose); padding: 10px 14px; border-radius: 4px; margin-top: 8px;\">\n      <strong>Süreksizlik ile CVU Çürütme (Contraposée) :</strong><br>\n      Eğer her $f_n$ sürekli olduğu halde noktasal limit $f$ bir $x_0$ noktasında <strong>süreksiz çıkarsa</strong>, yakınsaklık kesinlikle <strong>düzgün olamaz!</strong> (Örn: $f_n(x) = x^n$, $[0,1]$ aralığında $x=1$'de 1, diğer her yerde 0).\n    </div>\n  </div>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">Suite Test Yöntemi (Nokta Dizisi ile Çürütme)</div>\n  <div class=\"theory-box-body\">\n    <p>Limit fonksiyonu $f$ sürekli olsa bile CVU'yu çürütmek için $D$ kümesi içinde öyle bir $(x_n)$ dizisi seçilir ki:</p>\n    $$ |f_n(x_n) - f(x_n)| \\not\\to 0 \\implies (f_n) \\text{ ne converge pas uniformément sur } D. $$\n    <p>Örnek: $f_n(x) = n x e^{-nx}$ için $x_n = 1/n$ seçilirse $f_n(1/n) = 1/e \\neq 0$, dolayısıyla $[0, +\\infty[$ üzerinde düzgün yakınsaklık yoktur.</p>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Noktasal Yakınsaklık vs Düzgün Yakınsaklık</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 5 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Fonksiyon Dizileri: Convergence Simple vs Convergence Uniforme</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Noktasal Yakınsaklık (Convergence Simple - CVS)</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $(f_n)$ fonksiyon dizisi bir $D$ kümesinde $f$ fonksiyonuna <strong>noktasal yakınsar</strong> $\\iff$ her sabit $x \\in D$ için reel sayı dizisi $f_n(x) \to f(x)$ oluyorsa:</p>\n    $$ \\forall x \\in D, \\quad \\lim_{n\\to+\\infty} f_n(x) = f(x). $$\n  </div>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Düzgün Yakınsaklık (Convergence Uniforme - CVU)</div>\n  <div class=\"theory-box-body\">\n    <p>$(f_n)$ dizisi $D$ üzerinde $f$'e <strong>düzgün yakınsar</strong> $\\iff$ aralarındaki maksimum (supremum) mesafe $0$'a gidiyorsa:</p>\n    $$ \\|f_n - f\\|_\\infty = \\sup_{x\\in D} |f_n(x) - f(x)| \\xrightarrow[n\\to+\\infty]{} 0. $$\n    <p><strong>Geometrik Anlamı:</strong> $f$'in etrafına çizilen her $\\varepsilon$-tüpü içine, yeterince büyük $n$'ler için fonksiyon grafiğinin <em>tamamı</em> girer.</p>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. Sürekliliğin Korunması & Düzgün Yakınsaklığı Çürütme</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Sınav Stratejisi</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Théorème de Continuité & Test Dizisi (Suite Test) Yöntemi</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Théorème de Continuité de la Limite</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer her $f_n$ fonksiyonu $D$ üzerinde <strong>sürekli</strong> ise ve $(f_n)$, $f$'e $D$ üzerinde <strong>düzgün yakınsıyorsa</strong>, o zaman limit fonksiyonu $f$ de $D$ üzerinde <strong>kesinlikle süreklidir</strong>.</p>\n    <div style=\"background: rgba(239, 68, 68, 0.08); border-left: 3px solid var(--accent-rose); padding: 10px 14px; border-radius: 4px; margin-top: 8px;\">\n      <strong>Süreksizlik ile CVU Çürütme (Contraposée) :</strong><br>\n      Eğer her $f_n$ sürekli olduğu halde noktasal limit $f$ bir $x_0$ noktasında <strong>süreksiz çıkarsa</strong>, yakınsaklık kesinlikle <strong>düzgün olamaz!</strong> (Örn: $f_n(x) = x^n$, $[0,1]$ aralığında $x=1$'de 1, diğer her yerde 0).\n    </div>\n  </div>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">Suite Test Yöntemi (Nokta Dizisi ile Çürütme)</div>\n  <div class=\"theory-box-body\">\n    <p>Limit fonksiyonu $f$ sürekli olsa bile CVU'yu çürütmek için $D$ kümesi içinde öyle bir $(x_n)$ dizisi seçilir ki:</p>\n    $$ |f_n(x_n) - f(x_n)| \\not\\to 0 \\implies (f_n) \\text{ ne converge pas uniformément sur } D. $$\n    <p>Örnek: $f_n(x) = n x e^{-nx}$ için $x_n = 1/n$ seçilirse $f_n(1/n) = 1/e \\neq 0$, dolayısıyla $[0, +\\infty[$ üzerinde düzgün yakınsaklık yoktur.</p>\n  </div>\n</div>\n</div>"
    },
    "seriler_mod6": {
      "id": "seriler_mod6",
      "title": "Modül 6: TD 6 - Suites et Séries de Fonctions (Fonksiyon Serileri & İleri Düzey)",
      "shortTitle": "TD-6: Fonksiyon Serileri",
      "badge": "TD 6",
      "description": "Galatasaray Üniversitesi MAT201 TD 6 (TD 5 suite) çalışma föyündeki 6 sorunun eksiksiz çözümü: Noktasal ve düzgün yakınsaklık, süreklilik aktarımı çelişkisi, değişken tepe noktalı diziler (1/e limiti), düzgün Cauchy kriteri, 4 fonksiyon serisi yakınsaklık türü ve 8 büyük Vrai/Faux teoremi.",
      "exercises": [
        {
          "id": "s6_ex1",
          "name": "TD 6 • Ex 1 : Convergence Simple et Uniforme",
          "subtitle": "Temel Fonksiyon Dizilerinde Noktasal ve Düzgün Yakınsaklık Analizi",
          "tag": "TD 6",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<strong>TD 6 • Exercice 1 :</strong><br>\nPour chacune des suites de fonctions suivantes, déterminer la limite simple, puis étudier la convergence uniforme sur le domaine indiqué :\n$$ (a) \\quad f_n(x) = \\frac{x}{1+nx}, \\quad x \\in [0, 1] $$\n$$ (b) \\quad f_n(x) = \\frac{x}{n+x}, \\quad x \\in [0, +\\infty[ $$\n$$ (c) \\quad f_n(x) = \\frac{x^2}{n+x^2}, \\quad x \\in \\mathbb{R} $$r",
          "hint": "(a) $f_n'(x) > 0$ olduğu için fonksiyon artandır, maksimumu $x=1$'de alır: $\\sup = 1/(1+n) \\to 0$ (düzgün). (b) Sınırsız aralıkta $x_n = n$ suite test'i ile $\\sup \\to 1 \\ne 0$. (c) $\\mathbb{R}$'de $x_n = \\sqrt{n}$ suite test'i ile $\\sup \\to 1 \\ne 0$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Cas a) — f_n(x) = x / (1 + nx) sur [0, 1]",
              "content": "<p><strong>Limite simple :</strong>\nSoit $x \\in [0, 1]$ fixé.\n- Si $x = 0$, $f_n(0) = 0$ pour tout $n$, donc $\\lim f_n(0) = 0$.\n- Si $x \\in ]0, 1]$, $f_n(x) \\sim \\frac{x}{nx} = \\frac{1}{n} \\xrightarrow[n \\to +\\infty]{} 0$.\nLa limite simple est la fonction identiquement nulle $f(x) = 0$ sur $[0, 1]$.\n<p><strong>Convergence uniforme :</strong>\nCalculons la dérivée de $f_n$ par rapport à $x$ :\n$$ f_n'(x) = \\frac{1 \\cdot (1 + nx) - x \\cdot n}{(1 + nx)^2} = \\frac{1}{(1 + nx)^2} > 0 $$\nLa fonction $f_n$ est strictement croissante sur $[0, 1]$. Son maximum est donc atteint en $x = 1$ :\n$$ \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| = \\sup_{x \\in [0, 1]} f_n(x) = f_n(1) = \\frac{1}{1 + n} $$\nPassons à la limite :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| = \\lim_{n \\to +\\infty} \\frac{1}{1 + n} = 0 $$\nPar conséquent, la suite $(f_n)$ <strong>converge uniformément vers 0 sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 2 : Cas b) — f_n(x) = x / (n + x) sur [0, +∞[",
              "content": "<p><strong>Limite simple :</strong>\nPour chaque $x \\in [0, +\\infty[$ fixé :\n$$ \\lim_{n \\to +\\infty} \\frac{x}{n + x} = 0 \\implies f(x) = 0 \\quad \\text{sur } [0, +\\infty[ $$\n<p><strong>Convergence uniforme :</strong>\nCalculons la borne supérieure de l'écart sur $[0, +\\infty[$ :\nLa dérivée est $f_n'(x) = \\frac{n}{(n+x)^2} > 0$, donc $f_n$ est croissante. Sa borne supérieure est atteinte à l'infini :\n$$ \\sup_{x \\in [0, +\\infty[} |f_n(x) - 0| = \\lim_{x \\to +\\infty} \\frac{x}{n + x} = 1 $$\nComme cette borne supérieure vaut $1 \\ne 0$ pour tout $n$, la convergence n'est pas uniforme.\n<p><strong>Suite test explicite :</strong>\nPosons $x_n = n \\in [0, +\\infty[$. Alors :\n$$ |f_n(x_n) - f(x_n)| = f_n(n) = \\frac{n}{n + n} = \\frac{1}{2} \\xrightarrow[n \\to +\\infty]{} \\frac{1}{2} \\ne 0 $$\nLa suite $(f_n)$ <strong>ne converge pas uniformément sur $[0, +\\infty[$</strong> (mais elle converge uniformément sur tout segment compact $[0, M]$).r"
            },
            {
              "title": "Étape 3 : Cas c) — f_n(x) = x² / (n + x²) sur ℝ",
              "content": "<p><strong>Limite simple :</strong>\nPour tout $x \\in \\mathbb{R}$ fixé :\n$$ \\lim_{n \\to +\\infty} \\frac{x^2}{n + x^2} = 0 \\implies f(x) = 0 \\quad \\text{sur } \\mathbb{R} $$\n<p><strong>Convergence uniforme :</strong>\nPar symétrie ($f_n$ est paire) et croissance en $|x|$ :\n$$ \\sup_{x \\in \\mathbb{R}} \\frac{x^2}{n + x^2} = \\lim_{x \\to \\pm\\infty} \\frac{x^2}{n + x^2} = 1 \\ne 0 $$\n<p><strong>Suite test explicite :</strong>\nChoisissons la suite de points $x_n = \\sqrt{n} \\in \\mathbb{R}$.\nCalculons l'écart :\n$$ |f_n(x_n) - f(x_n)| = f_n(\\sqrt{n}) = \\frac{(\\sqrt{n})^2}{n + (\\sqrt{n})^2} = \\frac{n}{n + n} = \\frac{1}{2} $$\nPuisque $\\lim_{n \\to +\\infty} \\frac{1}{2} = \\frac{1}{2} \\ne 0$, la suite $(f_n)$ <strong>ne converge pas uniformément sur $\\mathbb{R}$</strong> (bien qu'elle converge uniformément sur tout segment borné $[-M, M]$). ■r"
            }
          ]
        },
        {
          "id": "s6_ex2",
          "name": "TD 6 • Ex 2 : Convergence Uniforme et Continuité",
          "subtitle": "Süreklilik Aktarımı ve Düzgün Yakınsaklığın Reddi (f_n(x) = nx / (1+nx))",
          "tag": "TD 6",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<strong>TD 6 • Exercice 2 :</strong><br>\nOn considère la suite de fonctions définies sur $[0, 1]$ par :\n$$ f_n(x) = \\frac{nx}{1 + nx} $$\n(1) Déterminer la limite simple $f$ de la suite $(f_n)$ sur $[0, 1]$.<br>\n(2) La fonction $f$ est-elle continue sur $[0, 1]$ ?<br>\n(3) En déduire que la convergence n'est pas uniforme sur $[0, 1]$.<br>\n(4) Retrouver ce résultat en calculant explicitement $\\sup_{x \\in [0, 1]} |f_n(x) - f(x)|$.<br>\n(5) Montrer que la convergence est uniforme sur $[a, 1]$ pour tout $a \\in ]0, 1[$.r",
          "hint": "Noktasal limit $x=0$'da 0 iken, $x > 0$ için $1$'dir. Limit fonksiyonu 0 noktasında süreksizdir! Süreklilik teoreminden $[0, 1]$'de düzgün yakınsaklık hemen çürütülür. $[a, 1]$ aralığında ise $|f_n(x) - 1| = \\frac{1}{1+nx} \\le \\frac{1}{1+na} \\to 0$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Parties (1), (2) et (3) — Limite Simple et Continuité",
              "content": "<p><strong>(1) Limite simple sur $[0, 1]$ :</strong>\n- Pour $x = 0$ : $f_n(0) = \\frac{0}{1+0} = 0 \\xrightarrow[n \\to +\\infty]{} 0$.\n- Pour $x \\in ]0, 1]$ : factorisons par $nx$ :\n$$ f_n(x) = \\frac{nx}{nx \\left(\\frac{1}{nx} + 1\\right)} = \\frac{1}{1 + \\frac{1}{nx}} $$\nComme $x > 0$, $\\frac{1}{nx} \\xrightarrow[n \\to +\\infty]{} 0$, d'où $\\lim_{n \\to +\\infty} f_n(x) = 1$.\nLa fonction limite simple est donc :\n$$ f(x) = \\\\begin{cases} 0 & \\\\text{si } x = 0 \\\\\\\\ 1 & \\\\text{si } x \\\\in ]0, 1] \\\\end{cases} $$\n<p><strong>(2) Continuité de $f$ :</strong>\nLa limite à droite en 0 est $\\lim_{x \\to 0^+} f(x) = 1$, alors que la valeur en 0 est $f(0) = 0$.\nPuisque $\\lim_{x \\to 0^+} f(x) \\ne f(0)$, la fonction limite $f$ <strong>n'est pas continue en 0</strong>, donc elle n'est pas continue sur $[0, 1]$.\n<p><strong>(3) Déduction de la non-uniformité :</strong>\nPour tout $n \\ge 1$, la fonction $f_n$ est continue sur $[0, 1]$.\nD'après le <strong>théorème de continuité de la limite uniforme</strong>, si $(f_n)$ convergeait uniformément vers $f$ sur $[0, 1]$, alors $f$ serait obligatoirement continue sur $[0, 1]$.\nPuisque $f$ est discontinue, la suite $(f_n)$ <strong>NE CONVERGE PAS uniformément sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 2 : Partie (4) — Retrouver le Résultat par Calcul Direct du Supremum",
              "content": "<p>Calculons directement l'écart $|f_n(x) - f(x)|$ sur $[0, 1]$ :\n- Pour $x = 0$ : $|f_n(0) - f(0)| = |0 - 0| = 0$.\n- Pour $x \\in ]0, 1]$ :\n$$ |f_n(x) - f(x)| = \\left| \\frac{nx}{1 + nx} - 1 \\right| = \\left| \\frac{nx - (1 + nx)}{1 + nx} \\right| = \\frac{1}{1 + nx} $$\nCalculons la borne supérieure sur $[0, 1]$ :\n$$ \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| = \\sup_{x \\in ]0, 1]} \\frac{1}{1 + nx} = \\lim_{x \\to 0^+} \\frac{1}{1 + nx} = \\frac{1}{1 + 0} = 1 $$\nLa quantité reste strictement égale à 1 pour tout $n \\ge 1$ :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| = 1 \\ne 0 $$\nOn retrouve ainsi immédiatement que la convergence n'est pas uniforme sur $[0, 1]$.r"
            },
            {
              "title": "Étape 3 : Partie (5) — Convergence Uniforme sur [a, 1] (a > 0)",
              "content": "<p>Soit $a \\in ]0, 1[$ fixé.\nSur l'intervalle $[a, 1]$, la limite simple est $f(x) = 1$.\nPour tout $x \\in [a, 1]$, on a $x \\ge a > 0$, donc $1 + nx \\ge 1 + na$.\nPar passage à l'inverse :\n$$ |f_n(x) - f(x)| = \\frac{1}{1 + nx} \\le \\frac{1}{1 + na} $$\nCette majoration est totalement indépendante de $x \\in [a, 1]$.\nPrenons le supremum sur $[a, 1]$ :\n$$ \\sup_{x \\in [a, 1]} |f_n(x) - f(x)| \\le \\frac{1}{1 + na} $$\nPuisque $a > 0$, quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\frac{1}{1 + na} = 0 $$\nPar conséquent, la suite $(f_n)$ <strong>converge uniformément vers 1 sur $[a, 1]$</strong> pour tout $a \\in ]0, 1[$. ■r"
            }
          ]
        },
        {
          "id": "s6_ex3",
          "name": "TD 6 • Ex 3 : Suite de Fonctions à Maximum Variable",
          "subtitle": "Türevle Tepe Noktası Analizi (f_n(x) = nx(1-x)ⁿ ve Supremum Limiti 1/e)",
          "tag": "TD 6",
          "concepts": [
            "convergence_uniforme_sup"
          ],
          "enonce": "<strong>TD 6 • Exercice 3 :</strong><br>\nPour tout $n \\ge 1$, on pose :\n$$ f_n(x) = n x (1 - x)^n, \\qquad x \\in [0, 1] $$\n(1) Déterminer la limite simple de la suite $(f_n)$ sur $[0, 1]$.<br>\n(2) Étudier les variations de $f_n$ et déterminer son maximum sur $[0, 1]$.<br>\n(3) La convergence est-elle uniforme sur $[0, 1]$ ?<br>\n(4) Montrer que la convergence est uniforme sur $[a, 1]$ pour tout $a \\in ]0, 1[$.r",
          "hint": "Türev: $f_n'(x) = n(1-x)^{n-1}(1 - (n+1)x)$. Tepe noktası $x_n = \\frac{1}{n+1}$ noktasındadır. Maksimum değer $M_n = \\frac{n}{n+1}(1 - \\frac{1}{n+1})^n \\to 1/e \\ne 0$. Supremum sıfıra gitmediği için $[0, 1]$'de düzgün yakınsak DEĞİLDİR!",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Limite Simple sur [0, 1]",
              "content": "<p>Soit $x \\in [0, 1]$ fixé :\n- Si $x = 0$, $f_n(0) = n \\times 0 \\times 1^n = 0 \\to 0$.\n- Si $x = 1$, $f_n(1) = n \\times 1 \\times 0^n = 0 \\to 0$.\n- Si $x \\in ]0, 1[$, posons $q = 1 - x$. Puisque $x \\in ]0, 1[$, on a $0 < q < 1$.\nPar croissances comparées, une suite exponentielle de base strictement inférieure à 1 l'emporte sur toute puissance polynomiale :\n$$ \\lim_{n \\to +\\infty} n q^n = 0 \\implies \\lim_{n \\to +\\infty} n x (1 - x)^n = 0 $$\nAinsi, la limite simple est la fonction nulle sur tout $[0, 1]$ :\n$$ f(x) = 0 \\quad \\text{pour tout } x \\in [0, 1] $$r"
            },
            {
              "title": "Étape 2 : Partie (2) — Variations et Calcul du Maximum",
              "content": "<p>Pour tout $n \\ge 1$, la fonction $f_n$ est dérivable sur $[0, 1]$.\nCalculons sa dérivée $f_n'(x)$ à l'aide de la règle du produit :\n$$ f_n'(x) = n \\left[ 1 \\cdot (1 - x)^n + x \\cdot n(1 - x)^{n-1}(-1) \\right] = n (1 - x)^{n-1} \\left[ (1 - x) - n x \\right] $$\n$$ f_n'(x) = n (1 - x)^{n-1} [1 - (n + 1)x] $$\nÉtudions le signe de $f_n'(x)$ sur $[0, 1]$ :\nPour $x \\in [0, 1[$, $n(1-x)^{n-1} > 0$. Le signe de la dérivée est donc celui de $1 - (n+1)x$ :\n$$ f_n'(x) = 0 \\iff x = x_n = \\frac{1}{n + 1} \\in [0, 1] $$\n- Pour $x \\in [0, x_n]$, $f_n'(x) \\ge 0$ ($f_n$ est croissante).\n- Pour $x \\in [x_n, 1]$, $f_n'(x) \\le 0$ ($f_n$ est décroissante).\nLe maximum de $f_n$ sur $[0, 1]$ est donc atteint en $x_n = \\frac{1}{n+1}$ :\n$$ M_n = f_n(x_n) = n \\left(\\frac{1}{n + 1}\\right) \\left(1 - \\frac{1}{n + 1}\\right)^n = \\frac{n}{n + 1} \\left(1 - \\frac{1}{n + 1}\\right)^n $$r"
            },
            {
              "title": "Étape 3 : Partie (3) — Étude de la Convergence Uniforme sur [0, 1]",
              "content": "<p>Calculons la limite du maximum $M_n$ quand $n \\to +\\infty$ :\n$$ \\lim_{n \\to +\\infty} \\frac{n}{n + 1} = 1 $$\nUtilisons la limite fondamentale usuelle $\\lim_{n \\to +\\infty} \\left(1 - \\frac{1}{n+1}\\right)^n = e^{-1} = \\frac{1}{e}$ :\nEn effet :\n$$ \\left(1 - \\frac{1}{n+1}\\right)^n = \\exp\\left( n \\ln\\left(1 - \\frac{1}{n+1}\\right) \\right) \\sim \\exp\\left( n \\left(-\\frac{1}{n+1}\\right) \\right) \\xrightarrow[n \\to +\\infty]{} e^{-1} = \\frac{1}{e} $$\nPar produit de limites :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| = \\lim_{n \\to +\\infty} M_n = 1 \\times \\frac{1}{e} = \\frac{1}{e} \\approx 0.368 $$\nPuisque la borne supérieure tend vers $\\frac{1}{e} \\ne 0$, <strong>la suite $(f_n)$ NE CONVERGE PAS uniformément sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 4 : Partie (4) — Convergence Uniforme sur [a, 1] (a > 0)",
              "content": "<p>Soit $a \\in ]0, 1[$ fixé.\nPuisque le point de maximum $x_n = \\frac{1}{n+1} \\to 0$, il existe un entier $N_0 \\in \\mathbb{N}$ tel que pour tout $n \\ge N_0$ :\n$$ x_n = \\frac{1}{n+1} < a $$\nPar conséquent, pour tout $n \\ge N_0$, la fonction $f_n$ est <strong>strictement décroissante sur l'intervalle $[a, 1]$</strong> !\nSon maximum sur $[a, 1]$ est donc atteint au bord gauche $x = a$ :\n$$ \\sup_{x \\in [a, 1]} |f_n(x) - 0| = f_n(a) = n a (1 - a)^n $$\nPuisque $a \\in ]0, 1[$, on a $0 < 1 - a < 1$. Par croissances comparées :\n$$ \\lim_{n \\to +\\infty} n a (1 - a)^n = 0 $$\nAinsi :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in [a, 1]} |f_n(x) - 0| = 0 $$\nLa suite $(f_n)$ <strong>converge uniformément vers 0 sur $[a, 1]$</strong> pour tout $a \\in ]0, 1[$. ■r"
            }
          ]
        },
        {
          "id": "s6_ex4",
          "name": "TD 6 • Ex 4 : Critère de Cauchy Uniforme",
          "subtitle": "Düzgün Cauchy Kriteri ve Fonksiyon Serileri Yakınsaklığı",
          "tag": "TD 6",
          "concepts": [
            "critere_cauchy_racine",
            "convergence_uniforme_sup"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Düzgün Cauchy Kriteri (Critère de Cauchy Uniforme)</div><div class=\"theory-box-body\">\nUne suite de fonctions $(f_n)$ converge uniformément sur $D$ si et seulement si elle est uniformément de Cauchy sur $D$, c'est-à-dire :\n$$ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall m > n \\ge N, \\quad \\sup_{x \\in D} |f_m(x) - f_n(x)| < \\varepsilon $$\n</div></div>\n<strong>TD 6 • Exercice 4 :</strong><br>\n(1) Soit $(f_n)$ une suite de fonctions définies sur un ensemble non-vide $D$. Montrer que la condition $\\sup_{x \\in D} |f_{n+1}(x) - f_n(x)| \\xrightarrow[n \\to +\\infty]{} 0$ <strong>ne suffit pas</strong> à garantir que $(f_n)$ est uniformément de Cauchy sur $D$.<br>\n(2) Pour $n \\ge 1$, on considère la suite de fonctions définies sur $[0, 1]$ par :\n$$ f_n(x) = \\sum_{k=1}^n \\frac{x^k}{k^2} $$\nMontrer, à l'aide du critère de Cauchy uniforme, que $(f_n)$ converge uniformément sur $[0, 1]$ sans chercher à déterminer sa limite.<br>\n(3) On considère la série de fonctions $\\sum_{n=1}^{+\\infty} \\frac{x^n}{n}$ avec $x \\in [0, 1[$. Montrer, à l'aide du critère de Cauchy uniforme, que cette série ne converge pas uniformément sur $[0, 1[$.r",
          "hint": "(1) Harmonik serinin kısmi toplamlarını düşün: $H_n = \\sum_{k=1}^n 1/k$. $|H_{n+1}-H_n| = 1/(n+1) \\to 0$, ama $H_{2n}-H_n \\ge 1/2 \\not\\to 0$. (2) Riemann serisi kalıntısıyla sınırla: $\\sum_{k=n+1}^m x^k/k^2 \\le \\sum_{k=n+1}^\\infty 1/k^2 \\to 0$.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Partie (1) — Insuffisance de la Condition |f_{n+1} - f_n| → 0",
              "content": "<p>Considérons la suite de fonctions constantes sur $D$ définie par les sommes partielles de la série harmonique :\n$$ f_n(x) = \\sum_{k=1}^n \\frac{1}{k} = H_n \\quad \\text{pour tout } x \\in D $$\nCalculons la différence entre deux termes consécutifs :\n$$ |f_{n+1}(x) - f_n(x)| = H_{n+1} - H_n = \\frac{1}{n+1} $$\nEn passant à la borne supérieure sur $D$ :\n$$ \\sup_{x \\in D} |f_{n+1}(x) - f_n(x)| = \\frac{1}{n+1} \\xrightarrow[n \\to +\\infty]{} 0 $$\nLa condition proposée est donc parfaitement satisfaite.\nPourtant, choisissons $m = 2n$. Alors pour tout $x \\in D$ :\n$$ |f_{2n}(x) - f_n(x)| = \\sum_{k=n+1}^{2n} \\frac{1}{k} \\ge \\sum_{k=n+1}^{2n} \\frac{1}{2n} = n \\times \\frac{1}{2n} = \\frac{1}{2} $$\nEn passant au supremum :\n$$ \\sup_{x \\in D} |f_{2n}(x) - f_n(x)| \\ge \\frac{1}{2} \\quad \\text{pour tout } n \\ge 1 $$\nPour $\\varepsilon = \\frac{1}{4} > 0$, il est impossible de rendre cette quantité inférieure à $\\varepsilon$ pour $n$ grand.\nLa suite $(f_n)$ n'est donc <strong>pas uniformément de Cauchy</strong> (elle diverge même vers $+\\infty$).\nLa condition $\\sup |f_{n+1}-f_n| \\to 0$ est donc <strong>absolument insuffisante</strong>.r"
            },
            {
              "title": "Étape 2 : Partie (2) — Convergence Uniforme par Cauchy de ∑ xᵏ / k² sur [0, 1]",
              "content": "<p>Soient $m, n \\in \\mathbb{N}$ deux entiers avec $m > n \\ge 1$.\nPour tout $x \\in [0, 1]$, calculons l'écart entre les sommes partielles :\n$$ |f_m(x) - f_n(x)| = \\left| \\sum_{k=n+1}^m \\frac{x^k}{k^2} \\right| = \\sum_{k=n+1}^m \\frac{x^k}{k^2} $$\nPuisque $x \\in [0, 1]$, on a $0 \\le x^k \\le 1^k = 1$ pour tout $k \\ge 1$.\nMajorer terme à terme :\n$$ |f_m(x) - f_n(x)| \\le \\sum_{k=n+1}^m \\frac{1}{k^2} \\le \\sum_{k=n+1}^{+\\infty} \\frac{1}{k^2} $$\nCette majoration est <em>totalement indépendante de $x \\in [0, 1]$</em>. Prenons le supremum sur $[0, 1]$ :\n$$ \\sup_{x \\in [0, 1]} |f_m(x) - f_n(x)| \\le \\sum_{k=n+1}^{+\\infty} \\frac{1}{k^2} = R_n $$\nOr, la série numérique $\\sum_{k=1}^{+\\infty} \\frac{1}{k^2}$ est une série de Riemann convergente ($\\alpha = 2 > 1$).\nPar propriété du reste d'une série numérique convergente :\n$$ \\lim_{n \\to +\\infty} R_n = \\lim_{n \\to +\\infty} \\sum_{k=n+1}^{+\\infty} \\frac{1}{k^2} = 0 $$\nAinsi, pour tout $\\varepsilon > 0$, il existe $N \\in \\mathbb{N}$ tel que pour tout $n \\ge N$, $R_n < \\varepsilon$.\nAlors pour tous $m > n \\ge N$ :\n$$ \\sup_{x \\in [0, 1]} |f_m(x) - f_n(x)| \\le R_n < \\varepsilon $$\nLa suite $(f_n)$ est <strong>uniformément de Cauchy sur $[0, 1]$</strong>.\nD'après le critère de Cauchy uniforme, <strong>la suite $(f_n)$ converge uniformément sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 3 : Partie (3) — Non-Convergence Uniforme de ∑ xⁿ / n sur [0, 1[",
              "content": "<p>Notons $S_n(x) = \\sum_{k=1}^n \\frac{x^k}{k}$ les sommes partielles de la série sur $D = [0, 1[$.\nChoisissons $m = 2n$. Pour tout $x \\in [0, 1[$ :\n$$ S_{2n}(x) - S_n(x) = \\sum_{k=n+1}^{2n} \\frac{x^k}{k} $$\nPuisque tous les termes sont positifs, calculons la borne supérieure sur $[0, 1[$ en faisant tendre $x \\to 1^-$ :\n$$ \\sup_{x \\in [0, 1[} |S_{2n}(x) - S_n(x)| = \\lim_{x \\to 1^-} \\sum_{k=n+1}^{2n} \\frac{x^k}{k} = \\sum_{k=n+1}^{2n} \\frac{1}{k} $$\nMinorer cette somme finie :\n$$ \\sum_{k=n+1}^{2n} \\frac{1}{k} \\ge \\sum_{k=n+1}^{2n} \\frac{1}{2n} = n \\times \\frac{1}{2n} = \\frac{1}{2} $$\nPar conséquent, pour tout entier $n \\ge 1$ :\n$$ \\sup_{x \\in [0, 1[} |S_{2n}(x) - S_n(x)| \\ge \\frac{1}{2} $$\nPour $\\varepsilon = \\frac{1}{4} > 0$, il n'existe aucun rang $N$ à partir duquel le supremum serait strictement inférieur à $\\varepsilon$.\nLa suite des sommes partielles n'est pas uniformément de Cauchy sur $[0, 1[$.\nPar le critère de Cauchy uniforme, la série $\\sum_{n=1}^{+\\infty} \\frac{x^n}{n}$ <strong>NE CONVERGE PAS uniformément sur $[0, 1[$</strong>. ■r"
            }
          ]
        },
        {
          "id": "s6_ex5",
          "name": "TD 6 • Ex 5 : Séries de Fonctions (Convergence Simple, Absolue, Uniforme et Normale)",
          "subtitle": "Fonksiyon Serilerinde 4 Yakınsaklık Türü ve Reste Théorème Kanıtı",
          "tag": "TD 6",
          "concepts": [
            "convergence_uniforme_sup",
            "critere_weierstrass"
          ],
          "enonce": "<div class=\"theory-box thm\"><div class=\"theory-box-title\">Hatırlatma (Rappel) : Fonksiyon Serilerinde Yakınsaklık Hiyerarşisi</div><div class=\"theory-box-body\">\n$$ \\text{Convergence Normale (Weierstrass)} \\implies \\text{Convergence Uniforme} \\implies \\text{Convergence Simple} $$\n$$ \\text{Convergence Normale} \\implies \\text{Convergence Absolue} \\implies \\text{Convergence Simple} $$\n<strong>Théorème du Reste :</strong> $\\sum f_n$ converge uniformément sur $D$ vers $S \\iff \\lim_{N \\to +\\infty} \\sup_{x \\in D} |R_N(x)| = 0$.\n</div></div>\n<strong>TD 6 • Exercice 5 :</strong><br>\nÉtudier la convergence simple, absolue, uniforme et normale des séries suivantes sur les domaines indiqués :\n$$ (a) \\quad \\sum_{n=1}^{+\\infty} \\frac{\\sin(nx)}{n^2}, \\quad x \\in \\mathbb{R} $$\n$$ (b) \\quad \\sum_{n=1}^{+\\infty} \\frac{(-1)^n x}{n}, \\quad x \\in [0, 1] $$\n$$ (c) \\quad \\sum_{n=1}^{+\\infty} \\frac{x}{(1+nx)(1+(n+1)x)}, \\quad x \\in [0, +\\infty[ $$\n<strong>Question Théorique :</strong> Soit $\\sum_{n=1}^{+\\infty} f_n$ convergeant simplement sur $D$, de somme $S$. On note $R_N(x) = S(x) - \\sum_{n=1}^N f_n(x)$. Montrer que la série converge uniformément sur $D$ si et seulement si $\\sup_{x \\in D} |R_N(x)| \\xrightarrow[N \\to +\\infty]{} 0$.r",
          "hint": "(a) $|\\sin(nx)| \\le 1$ ile $M_n = 1/n^2$ Weierstrass testinden Normal yakınsar. (b) Leibniz ile düzgün yakınsar ama $\\sum 1/n$ ıraksadığı için normal yakınsamaz! (c) Teleskopik açılım yap: $S_N(x) = \\frac{1}{1+x} - \\frac{1}{1+(N+1)x}$. $S(0)=0$ ve $S(x)=1/(1+x)$ süreksizdir, dolayısıyla düzgün yakınsamaz.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Série (a) — ∑ sin(nx) / n² sur ℝ",
              "content": "<p>Soit $u_n(x) = \\frac{\\sin(nx)}{n^2}$ pour tout $x \\in \\mathbb{R}$.\nCalculons la norme infinie de $u_n$ sur $\\mathbb{R}$ :\n$$ \\|u_n\\|_{\\infty, \\mathbb{R}} = \\sup_{x \\in \\mathbb{R}} \\left| \\frac{\\sin(nx)}{n^2} \\right| = \\frac{\\sup_{x \\in \\mathbb{R}} |\\sin(nx)|}{n^2} = \\frac{1}{n^2} $$\nLa série numérique majorante $\\sum_{n=1}^{+\\infty} \\frac{1}{n^2}$ est une série de Riemann convergente ($\\alpha = 2 > 1$).\nD'après le <strong>critère de Weierstrass (M-test)</strong>, la série $\\sum u_n$ est <strong>normalement convergente</strong> sur $\\mathbb{R}$.\nPar implications fondamentales :\n- Elle est <strong>uniformément convergente</strong> sur $\\mathbb{R}$.\n- Elle est <strong>absolument convergente</strong> en tout point de $\\mathbb{R}$.\n- Elle est <strong>simplement convergente</strong> sur $\\mathbb{R}$.\nDe plus, sa somme $S(x)$ est une fonction continue et $2\\pi$-périodique sur $\\mathbb{R}$.r"
            },
            {
              "title": "Étape 2 : Série (b) — ∑ (-1)ⁿ x / n sur [0, 1]",
              "content": "<p>Soit $u_n(x) = \\frac{(-1)^n x}{n}$ pour $x \\in [0, 1]$.\n<ul>\n  <li><strong>Convergence simple :</strong>\n  Pour $x = 0$, $u_n(0) = 0$ pour tout $n$, la somme vaut 0.\n  Pour $x \\in ]0, 1]$, c'est une série alternée avec $a_n(x) = \\frac{x}{n} > 0$, strictement décroissante et tendant vers 0. Par Leibniz, la série converge simplement sur $[0, 1]$.</li>\n  <li><strong>Convergence uniforme via le reste alterné :</strong>\n  D'après le théorème des séries alternées, l'erreur commise en approchant la somme par la somme partielle $S_N(x)$ est majorée par la valeur absolue du premier terme négligé :\n  $$ |R_N(x)| = \\left| S(x) - S_N(x) \\right| \\le |u_{N+1}(x)| = \\frac{x}{N+1} $$\n  En passant à la borne supérieure sur $[0, 1]$ :\n  $$ \\sup_{x \\in [0, 1]} |R_N(x)| \\le \\sup_{x \\in [0, 1]} \\frac{x}{N+1} = \\frac{1}{N+1} \\xrightarrow[N \\to +\\infty]{} 0 $$\n  La série converge donc <strong>UNIFORMÉMENT sur $[0, 1]$</strong>.</li>\n  <li><strong>Convergence absolue :</strong>\n  Pour $x \\in ]0, 1]$, $\\sum |u_n(x)| = x \\sum \\frac{1}{n} = +\\infty$ (série harmonique). La série ne converge absolument qu'en $x = 0$.</li>\n  <li><strong>Convergence normale :</strong>\n  $\\|u_n\\|_{\\infty, [0, 1]} = \\sup_{x \\in [0, 1]} \\frac{x}{n} = \\frac{1}{n}$. Comme $\\sum \\frac{1}{n} = +\\infty$, la série <strong>NE CONVERGE PAS normalement sur $[0, 1]$</strong>.\n  <em>(C'est l'archétype d'une série uniformément convergente mais non normalement convergente !)</em></li>\n</ul>r"
            },
            {
              "title": "Étape 3 : Série (c) — Télescopage et Rupture de Continuité",
              "content": "<p>Soit $u_n(x) = \\frac{x}{(1+nx)(1+(n+1)x)}$ sur $[0, +\\infty[$.\nDécomposons en éléments simples :\n$$ \\frac{1}{1+nx} - \\frac{1}{1+(n+1)x} = \\frac{(1+(n+1)x) - (1+nx)}{(1+nx)(1+(n+1)x)} = \\frac{x}{(1+nx)(1+(n+1)x)} = u_n(x) $$\nCalculons la somme partielle $S_N(x)$ par télescopage :\n$$ S_N(x) = \\sum_{n=1}^N \\left( \\frac{1}{1+nx} - \\frac{1}{1+(n+1)x} \\right) = \\frac{1}{1+x} - \\frac{1}{1+(N+1)x} $$\nCalculons la somme $S(x) = \\lim_{N \\to +\\infty} S_N(x)$ :\n- Si $x = 0$, $S_N(0) = 0$ pour tout $N$, donc $S(0) = 0$.\n- Si $x > 0$, $\\lim_{N \\to +\\infty} \\frac{1}{1+(N+1)x} = 0$, donc $S(x) = \\frac{1}{1+x}$.\nLa fonction somme $S$ est discontinue en $x = 0$ car $\\lim_{x \\to 0^+} S(x) = 1 \\ne S(0) = 0$.\nChaque terme $u_n$ étant continu sur $[0, +\\infty[$, si la convergence était uniforme, la somme $S$ serait continue.\nPar contraposée, la série <strong>NE CONVERGE PAS uniformément sur $[0, +\\infty[$</strong>.r"
            },
            {
              "title": "Étape 4 : Démonstration du Théorème Fondamental du Reste",
              "content": "<p><strong>Démonstration de l'équivalence :</strong>\nPar définition, la série de fonctions $\\sum_{n=1}^{+\\infty} f_n$ converge uniformément sur $D$ vers sa somme $S$ si et seulement si la suite de ses sommes partielles $(S_N)_{N \\ge 1}$ converge uniformément vers $S$ sur $D$.\nPar définition de la convergence uniforme d'une suite de fonctions :\n$$ (S_N) \\text{ converge uniformément vers } S \\text{ sur } D \\iff \\lim_{N \\to +\\infty} \\sup_{x \\in D} |S(x) - S_N(x)| = 0 $$\nOr, le reste d'ordre $N$ est par définition $R_N(x) = S(x) - S_N(x)$.\nEn substituant cette égalité :\n$$ \\lim_{N \\to +\\infty} \\sup_{x \\in D} |R_N(x)| = 0 $$\nL'équivalence est ainsi rigoureusement démontrée. ■r"
            }
          ]
        },
        {
          "id": "s6_ex6",
          "name": "TD 6 • Ex 6 : 8 Propositions Fondamentales Vrai ou Faux",
          "subtitle": "Meral Hoca'nın Sınav Arşivi: 8 Büyük Teorem, İspatlar ve Karşıt Örnekler",
          "tag": "TD 6",
          "concepts": [
            "convergence_uniforme_sup",
            "critere_weierstrass"
          ],
          "enonce": "<strong>TD 6 • Exercice 6 (Vrai ou Faux) :</strong><br>\nPour chacune des affirmations suivantes, déterminer si elle est vraie ou fausse. Justifier toute réponse affirmative par une démonstration et toute réponse négative par un contre-exemple explicite :<br>\n(1) Si une suite de fonctions continues converge simplement alors sa limite est continue.<br>\n(2) Si une suite de fonctions converge simplement vers une fonction continue alors la convergence est uniforme.<br>\n(3) Si une suite de fonctions converge uniformément sur tout segment de $]0, 1[$ alors elle converge uniformément sur $]0, 1[$.<br>\n(4) Si une suite de fonctions converge uniformément sur $D$ alors elle converge uniformément sur toute partie $A \\subset D$.<br>\n(5) Si une série de fonctions converge absolument en tout point de $D$ alors elle converge uniformément sur $D$.<br>\n(6) Si une série de fonctions converge normalement sur $D$ alors elle converge uniformément sur $D$.<br>\n(7) Si une série de fonctions converge uniformément sur $D$ alors elle converge normalement sur $D$.<br>\n(8) Si une série $\\sum f_n$ converge uniformément sur $D$ alors la suite $(f_n)$ converge uniformément vers zéro sur $D$.r",
          "hint": "Bu 8 soru Galatasaray Üniversitesi MAT201 vize ve finallerinin klasik doğru/yanlış havuzudur. Her yanlış için klasik bir karşıt örnek ($x^n$, $\\frac{nx}{1+n^2x^2}$, $\\sum \\frac{(-1)^n x}{n}$) ezberlenmelidir.",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "steps": [
            {
              "title": "Étape 1 : Proposition 1 — Fonctions Continues et Limite Simple",
              "content": "<p><strong>Proposition 1 : « Si une suite de fonctions continues converge simplement alors sa limite est continue. »</strong><br>\n<span style=\"color: #ef4444; font-weight: 700; font-size: 1.1rem;\">FAUX</span>\n<p><strong>Contre-exemple classique :</strong>\nPosons $f_n(x) = x^n$ sur le segment $[0, 1]$.\nChaque fonction $f_n$ est polynomiale, donc continue sur $[0, 1]$.\nPourtant, sa limite simple est la fonction $f$ définie par :\n$$ f(x) = \\\\begin{cases} 0 & \\\\text{si } x \\\\in [0, 1[ \\\\\\\\ 1 & \\\\text{si } x = 1 \\\\end{cases} $$\nCette fonction $f$ est discontinue en 1 car $\\lim_{x \\to 1^-} f(x) = 0 \\ne f(1) = 1$.\n<em>Remarque :</em> Pour garantir la continuité de la limite, la convergence UNIFORME est indispensable.r"
            },
            {
              "title": "Étape 2 : Proposition 2 — Limite Continue et Convergence Uniforme",
              "content": "<p><strong>Proposition 2 : « Si une suite de fonctions converge simplement vers une fonction continue alors la convergence est uniforme. »</strong><br>\n<span style=\"color: #ef4444; font-weight: 700; font-size: 1.1rem;\">FAUX</span>\n<p><strong>Contre-exemple :</strong>\nConsidérons $f_n(x) = \\frac{nx}{1 + n^2 x^2}$ sur $[0, 1]$.\nLa limite simple est la fonction nulle $f(x) = 0$ pour tout $x \\in [0, 1]$, qui est parfaitement continue sur tout $[0, 1]$.\nCependant, en $x_n = \\frac{1}{n} \\in [0, 1]$ :\n$$ f_n(x_n) = \\frac{1}{1 + 1} = \\frac{1}{2} \\implies \\sup_{x \\in [0, 1]} |f_n(x) - f(x)| \\ge \\frac{1}{2} $$\nLe supremum ne tend pas vers 0, donc la convergence n'est pas uniforme.r"
            },
            {
              "title": "Étape 3 : Proposition 3 — Convergence Uniforme Locale vs Globale",
              "content": "<p><strong>Proposition 3 : « Si une suite de fonctions converge uniformément sur tout segment de $]0, 1[$ alors elle converge uniformément sur $]0, 1[$. »</strong><br>\n<span style=\"color: #ef4444; font-weight: 700; font-size: 1.1rem;\">FAUX</span>\n<p><strong>Contre-exemple :</strong>\nConsidérons $f_n(x) = x^n$ sur $]0, 1[$.\nSur tout segment compact $[a, b] \\subset ]0, 1[$, on a $0 < a \\le b < 1$.\nAlors $\\sup_{x \\in [a, b]} |x^n| = b^n \\xrightarrow[n \\to +\\infty]{} 0$, donc $(f_n)$ converge uniformément sur tout segment.\nPourtant, sur tout l'intervalle $]0, 1[$ :\n$$ \\sup_{x \\in ]0, 1[} x^n = \\lim_{x \\to 1^-} x^n = 1 \\not\\to 0 $$\nLa convergence n'est donc pas uniforme sur $]0, 1[$. (Convergence compacte n'implique pas convergence globale).r"
            },
            {
              "title": "Étape 4 : Proposition 4 — Restriction à une Partie A ⊂ D",
              "content": "<p><strong>Proposition 4 : « Si une suite de fonctions converge uniformément sur $D$ alors elle converge uniformément sur toute partie $A \\subset D$. »</strong><br>\n<span style=\"color: #10b981; font-weight: 700; font-size: 1.1rem;\">VRAI</span>\n<p><strong>Démonstration :</strong>\nSoit $A \\subset D$.\nPour tout $n \\in \\mathbb{N}$, par définition de la borne supérieure :\n$$ 0 \\le \\sup_{x \\in A} |f_n(x) - f(x)| \\le \\sup_{x \\in D} |f_n(x) - f(x)| $$\nPar hypothèse, le majorant $\\sup_{x \\in D} |f_n(x) - f(x)|$ tend vers 0 quand $n \\to +\\infty$.\nD'après le théorème des gendarmes, $\\lim_{n \\to +\\infty} \\sup_{x \\in A} |f_n(x) - f(x)| = 0$.\nLa convergence est donc bien uniforme sur $A$.r"
            },
            {
              "title": "Étape 5 : Proposition 5 — Convergence Absolue Ponctuelle vs Uniforme",
              "content": "<p><strong>Proposition 5 : « Si une série de fonctions converge absolument en tout point de $D$ alors elle converge uniformément sur $D$. »</strong><br>\n<span style=\"color: #ef4444; font-weight: 700; font-size: 1.1rem;\">FAUX</span>\n<p><strong>Contre-exemple :</strong>\nConsidérons la série géométrique $\\sum_{n=0}^{+\\infty} x^n$ sur $D = [0, 1[$.\nPour chaque $x \\in [0, 1[$ fixé, $|x^n| = x^n$ et la série géométrique converge absolument vers $\\frac{1}{1-x}$.\nCependant, le reste d'ordre $N$ est :\n$$ R_N(x) = \\sum_{n=N+1}^{+\\infty} x^n = \\frac{x^{N+1}}{1 - x} $$\nEn faisant tendre $x \\to 1^-$, $\\lim_{x \\to 1^-} \\frac{x^{N+1}}{1 - x} = +\\infty$.\nAinsi, $\\sup_{x \\in [0, 1[} |R_N(x)| = +\\infty \\ne 0$.\nLa série ne converge pas uniformément sur $[0, 1[$.r"
            },
            {
              "title": "Étape 6 : Proposition 6 — Convergence Normale Implique Convergence Uniforme",
              "content": "<p><strong>Proposition 6 : « Si une série de fonctions converge normalement sur $D$ alors elle converge uniformément sur $D$. »</strong><br>\n<span style=\"color: #10b981; font-weight: 700; font-size: 1.1rem;\">VRAI</span>\n<p><strong>Démonstration :</strong>\nPar définition de la convergence normale, $\\|f_n\\|_\\infty = \\sup_{x \\in D} |f_n(x)| \\le M_n$ où $\\sum M_n$ est une série numérique convergente.\nSoient $m > n$. Pour tout $x \\in D$ :\n$$ |S_m(x) - S_n(x)| = \\left| \\sum_{k=n+1}^m f_k(x) \\right| \\le \\sum_{k=n+1}^m |f_k(x)| \\le \\sum_{k=n+1}^m M_k \\le \\sum_{k=n+1}^{+\\infty} M_k $$\nEn passant au supremum sur $D$ :\n$$ \\sup_{x \\in D} |S_m(x) - S_n(x)| \\le \\sum_{k=n+1}^{+\\infty} M_k \\xrightarrow[n \\to +\\infty]{} 0 $$\nD'après le critère de Cauchy uniforme, la suite des sommes partielles converge uniformément sur $D$.r"
            },
            {
              "title": "Étape 7 : Proposition 7 — Réciproque de la Convergence Normale",
              "content": "<p><strong>Proposition 7 : « Si une série de fonctions converge uniformément sur $D$ alors elle converge normalement sur $D$. »</strong><br>\n<span style=\"color: #ef4444; font-weight: 700; font-size: 1.1rem;\">FAUX</span>\n<p><strong>Contre-exemple :</strong>\nConsidérons la série $\\sum_{n=1}^{+\\infty} \\frac{(-1)^n x}{n}$ sur $[0, 1]$ (Exercice 5b).\n- Elle converge uniformément sur $[0, 1]$ car par le critère des séries alternées, $\\sup_{x \\in [0, 1]} |R_N(x)| \\le \\frac{1}{N+1} \\to 0$.\n- Pourtant, $\\|u_n\\|_{\\infty, [0, 1]} = \\sup_{x \\in [0, 1]} \\frac{x}{n} = \\frac{1}{n}$.\nComme la série numérique $\\sum \\frac{1}{n}$ diverge (série harmonique), la série <strong>ne converge pas normalement sur $[0, 1]$</strong>.r"
            },
            {
              "title": "Étape 8 : Proposition 8 — Condition Nécessaire de Convergence Uniforme d'une Série",
              "content": "<p><strong>Proposition 8 : « Si une série $\\sum f_n$ converge uniformément sur $D$ alors la suite $(f_n)$ converge uniformément vers zéro sur $D$. »</strong><br>\n<span style=\"color: #10b981; font-weight: 700; font-size: 1.1rem;\">VRAI</span>\n<p><strong>Démonstration :</strong>\nSoit $S_n = \\sum_{k=1}^n f_k$ la suite des sommes partielles.\nPar hypothèse, la série converge uniformément vers sa somme $S$ sur $D$, ce qui signifie que $\\sup_{x \\in D} |S_n(x) - S(x)| \\xrightarrow[n \\to +\\infty]{} 0$.\nExprimons le terme général $f_n$ comme la différence de deux sommes partielles consécutives :\n$$ f_n(x) = S_n(x) - S_{n-1}(x) = (S_n(x) - S(x)) - (S_{n-1}(x) - S(x)) $$\nPar l'inégalité triangulaire :\n$$ |f_n(x)| \\le |S_n(x) - S(x)| + |S_{n-1}(x) - S(x)| $$\nEn passant à la borne supérieure sur $D$ :\n$$ \\sup_{x \\in D} |f_n(x)| \\le \\sup_{x \\in D} |S_n(x) - S(x)| + \\sup_{x \\in D} |S_{n-1}(x) - S(x)| $$\nQuand $n \\to +\\infty$, les deux termes de droite tendent vers 0.\nPar le théorème des gendarmes :\n$$ \\lim_{n \\to +\\infty} \\sup_{x \\in D} |f_n(x)| = 0 $$\nLa suite de fonctions $(f_n)$ converge donc bien <strong>uniformément vers zéro sur $D$</strong>. ■r"
            }
          ]
        }
      ],
      "breadcrumb": "MAT201 > Modül 6 (TD 6) > Fonksiyon Serileri & İleri Düzey",
      "concepts": [
        "critere_weierstrass",
        "convergence_uniforme_sup",
        "series_riemann_bertrand"
      ],
      "theoryPages": [
        {
          "title": "1. Fonksiyon Serilerinde Normal Yakınsaklık (CVN)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 6 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Fonksiyon Serileri, Normal Yakınsaklık ve Weierstrass Kriteri</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Normal Yakınsaklık (Convergence Normale - CVN)</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $\\sum f_n(x)$ fonksiyon serisinin $D$ üzerinde <strong>normal yakınsak</strong> olması, supremum normlarının serisinin yakınsak olması demektir:</p>\n    $$ \\sum_{n=0}^{+\\infty} \\|f_n\\|_\\infty = \\sum_{n=0}^{+\\infty} \\sup_{x\\in D} |f_n(x)| < +\\infty. $$\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Critère de Weierstrass (M-Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer her $n$ ve her $x \\in D$ için $|f_n(x)| \\le M_n$ olacak şekilde pozitif terimli bir $\\sum M_n < +\\infty$ sayısal serisi bulunabiliyorsa, $\\sum f_n$ serisi $D$ üzerinde <strong>normal (ve dolayısıyla düzgün ve mutlak) yakınsar</strong>.</p>\n    <div style=\"background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); padding: 10px 14px; border-radius: 4px; margin-top: 8px;\">\n      <strong>Yakınsaklık Hiyerarşisi (Sınavın En Önemli Şeması) :</strong><br>\n      $$ \\text{Convergence Normale} \\implies \\text{Convergence Uniforme} \\implies \\text{Convergence Simple} $$\n      $$ \\text{Convergence Normale} \\implies \\text{Convergence Absolue} \\implies \\text{Convergence Simple} $$\n    </div>\n  </div>\n</div>\n"
        },
        {
          "title": "2. Toplamın Sürekliliği & Terim Terime İşlemler",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Analizin Temel Teoremleri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Süreklilik, İntegral ve Türev Alma Teoremleri</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Théorème de Continuité de la Somme</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer her $f_n$ fonksiyonu $D$ üzerinde sürekli ve $\\sum f_n$ serisi $D$ üzerinde <strong>düzgün yakınsak</strong> (veya normal yakınsak) ise, toplam fonksiyonu $S(x) = \\sum_{n=0}^{+\\infty} f_n(x)$ da $D$ üzerinde <strong>kesinlikle süreklidir</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Terim Terime İntegral ve Türev Alma (Intégration & Dérivation)</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>İntegral :</strong> $\\sum f_n$, $[a,b]$ kapalı aralığında düzgün yakınsak ise limit ile integral yer değiştirir:\n      $$ \\int_a^b \\left( \\sum_{n=0}^{+\\infty} f_n(x) \\right) dx = \\sum_{n=0}^{+\\infty} \\int_a^b f_n(x) dx. $$</li>\n      <li><strong>Türev :</strong> $\\sum f_n(x_0)$ yakınsak ve türevler serisi $\\sum f_n'(x)$ <strong>düzgün yakınsak</strong> ise toplam türevlenebilir ve:\n      $$ \\left( \\sum_{n=0}^{+\\infty} f_n(x) \\right)' = \\sum_{n=0}^{+\\infty} f_n'(x). $$</li>\n    </ul>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Fonksiyon Serilerinde Normal Yakınsaklık (CVN)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">TD 6 Temel Teori</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Fonksiyon Serileri, Normal Yakınsaklık ve Weierstrass Kriteri</h2>\n</div>\n\n<div class=\"theory-box defn\">\n  <div class=\"theory-box-title\">Normal Yakınsaklık (Convergence Normale - CVN)</div>\n  <div class=\"theory-box-body\">\n    <p>Bir $\\sum f_n(x)$ fonksiyon serisinin $D$ üzerinde <strong>normal yakınsak</strong> olması, supremum normlarının serisinin yakınsak olması demektir:</p>\n    $$ \\sum_{n=0}^{+\\infty} \\|f_n\\|_\\infty = \\sum_{n=0}^{+\\infty} \\sup_{x\\in D} |f_n(x)| < +\\infty. $$\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Critère de Weierstrass (M-Testi)</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer her $n$ ve her $x \\in D$ için $|f_n(x)| \\le M_n$ olacak şekilde pozitif terimli bir $\\sum M_n < +\\infty$ sayısal serisi bulunabiliyorsa, $\\sum f_n$ serisi $D$ üzerinde <strong>normal (ve dolayısıyla düzgün ve mutlak) yakınsar</strong>.</p>\n    <div style=\"background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); padding: 10px 14px; border-radius: 4px; margin-top: 8px;\">\n      <strong>Yakınsaklık Hiyerarşisi (Sınavın En Önemli Şeması) :</strong><br>\n      $$ \\text{Convergence Normale} \\implies \\text{Convergence Uniforme} \\implies \\text{Convergence Simple} $$\n      $$ \\text{Convergence Normale} \\implies \\text{Convergence Absolue} \\implies \\text{Convergence Simple} $$\n    </div>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. Toplamın Sürekliliği & Terim Terime İşlemler</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Analizin Temel Teoremleri</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Süreklilik, İntegral ve Türev Alma Teoremleri</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Théorème de Continuité de la Somme</div>\n  <div class=\"theory-box-body\">\n    <p>Eğer her $f_n$ fonksiyonu $D$ üzerinde sürekli ve $\\sum f_n$ serisi $D$ üzerinde <strong>düzgün yakınsak</strong> (veya normal yakınsak) ise, toplam fonksiyonu $S(x) = \\sum_{n=0}^{+\\infty} f_n(x)$ da $D$ üzerinde <strong>kesinlikle süreklidir</strong>.</p>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Terim Terime İntegral ve Türev Alma (Intégration & Dérivation)</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>İntegral :</strong> $\\sum f_n$, $[a,b]$ kapalı aralığında düzgün yakınsak ise limit ile integral yer değiştirir:\n      $$ \\int_a^b \\left( \\sum_{n=0}^{+\\infty} f_n(x) \\right) dx = \\sum_{n=0}^{+\\infty} \\int_a^b f_n(x) dx. $$</li>\n      <li><strong>Türev :</strong> $\\sum f_n(x_0)$ yakınsak ve türevler serisi $\\sum f_n'(x)$ <strong>düzgün yakınsak</strong> ise toplam türevlenebilir ve:\n      $$ \\left( \\sum_{n=0}^{+\\infty} f_n(x) \\right)' = \\sum_{n=0}^{+\\infty} f_n'(x). $$</li>\n    </ul>\n  </div>\n</div>\n</div>"
    },
    "seriler_mod7": {
      "id": "seriler_mod7",
      "title": "Modül 7: Quiz & Vize Master Özeti (Karar Ağaçları & 8 Arketip)",
      "shortTitle": "Vize Master & Karar Ağaçları",
      "badge": "Vize Master",
      "description": "Galatasaray Üniversitesi MAT201 Seriler & Analiz vize sınavında çıkabilecek 8 temel soru arketipi, adım adım karar ağaçları ve garanti puan kazandıran sınav çözümleri.",
      "exercises": [
        {
          "id": "s7_ex1",
          "name": "Arketip Tip 1",
          "subtitle": "Alterne Seri ve Şartlı Yakınsaklık (Leibniz Testi)",
          "hint": "Önce $|u_n| = 1/n^{1/2}$ Riemann serisiyle mutlak yakınsaklığı inceleyin, ardından <span class=\"term-link\" onclick=\"openConceptModal('critere_leibniz_series')\">Leibniz</span> kriterinin iki şartını doğrulayın.",
          "steps": [
            {
              "title": "Étape 1 : Étude de la convergence absolue",
              "content": "Posons $u_n = \\frac{(-1)^n}{\\sqrt{n}}$. En valeur absolue, $|u_n| = \\frac{1}{n^{1/2}}$ est le terme général d'une <span class=\"term-link\" onclick=\"openConceptModal('series_riemann_bertrand')\">série de Riemann</span> avec $\\alpha = \\frac{1}{2} \\le 1$. La série $\\sum |u_n|$ <strong>diverge</strong> : la série n'est donc pas <span class=\"term-link\" onclick=\"openConceptModal('series_telescopiques_absolue')\">absolument convergente</span>."
            },
            {
              "title": "Étape 2 : Application du critère spécial des séries alternées (Leibniz)",
              "content": "On a $u_n = (-1)^n a_n$ avec $a_n = \\frac{1}{\\sqrt{n}} > 0$. La suite $(a_n)$ est strictement décroissante (car $n \\mapsto \\sqrt{n}$ est croissante) et $\\lim_{n \\to +\\infty} a_n = 0$. D'après le <span class=\"term-link\" onclick=\"openConceptModal('critere_leibniz_series')\">critère de Leibniz</span>, la série $\\sum u_n$ <strong>converge</strong>. Elle est donc <strong><span class=\"term-link\" onclick=\"openConceptModal('series_telescopiques_absolue')\">semi-convergente</span> (conditionnellement convergente)</strong>."
            }
          ],
          "enonce": "Étudier la <span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence simple</span> et la <span class=\"term-link\" onclick=\"openConceptModal('series_telescopiques_absolue')\">convergence absolue</span> de la série numérique $\\sum_{n \\ge 1} \\frac{(-1)^n}{\\sqrt{n}}$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Étude de la <span class=\"term-link\" onclick=\"openConceptModal('series_telescopiques_absolue')\">convergence absolue</span></strong><br>Posons $u_n = \\frac{(-1)^n}{\\sqrt{n}}$. En valeur absolue, $|u_n| = \\frac{1}{n^{1/2}}$ est le terme général d'une <span class=\"term-link\" onclick=\"openConceptModal('series_riemann_bertrand')\">série de Riemann</span> avec $\\alpha = \\frac{1}{2} \\le 1$. La série $\\sum |u_n|$ <strong>diverge</strong> : la série n'est donc pas absolument convergente.<br><br><strong>Étape 2 : Application du <span class=\"term-link\" onclick=\"openConceptModal('critere_leibniz_series')\">critère spécial des séries alternées</span> (Leibniz)</strong><br>On a $u_n = (-1)^n a_n$ avec $a_n = \\frac{1}{\\sqrt{n}} > 0$. La suite $(a_n)$ est strictement décroissante (car $n \\mapsto \\sqrt{n}$ est croissante) et $\\lim_{n \\to +\\infty} a_n = 0$. D'après le critère de Leibniz, la série $\\sum u_n$ <strong>converge</strong>. Elle est donc <strong>semi-convergente (conditionnellement convergente)</strong>.",
          "concepts": [
            "series_telescopiques_absolue",
            "convergence_uniforme_sup",
            "critere_leibniz_series",
            "series_riemann_bertrand"
          ]
        },
        {
          "id": "s7_ex2",
          "name": "Arketip Tip 2",
          "subtitle": "D'Alembert Oran Testi (Faktöriyel ve Üstel İfadeler)",
          "hint": "$u_{n+1}/u_n$ oranını sadeleştirip $\\lim (1 + 1/n)^n = e$ limitini kullanın.",
          "steps": [
            {
              "title": "Étape 1 : Calcul et simplification du quotient u_{n+1} / u_n",
              "content": "Pour tout $n \\ge 1$, $u_n > 0$. Formons le rapport de <span class=\"term-link\" onclick=\"openConceptModal('theoreme_dalembert')\">d'Alembert</span> :\n$$\\frac{u_{n+1}}{u_n} = \\frac{2^{n+1}(n+1)!}{(n+1)^{n+1}} \\times \\frac{n^n}{2^n n!} = 2\\left(\\frac{n}{n+1}\\right)^n = \\frac{2}{\\left(1 + \\frac{1}{n}\\right)^n}$$"
            },
            {
              "title": "Étape 2 : Passage à la limite et conclusion",
              "content": "Puisque $\\lim_{n \\to +\\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2{,}718 > 2$, on obtient :\n$$L = \\lim_{n \\to +\\infty} \\frac{u_{n+1}}{u_n} = \\frac{2}{e} < 1$$\nD'après le <span class=\"term-link\" onclick=\"openConceptModal('theoreme_dalembert')\">critère de d'Alembert</span>, la série $\\sum u_n$ <strong>converge</strong>."
            }
          ],
          "enonce": "Étudier la nature de la série à <span class=\"term-link\" onclick=\"openConceptModal('series_riemann_bertrand')\">termes positifs</span> $\\sum_{n \\ge 1} \\frac{2^n n!}{n^n}$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Calcul et simplification du quotient u_{n+1} / u_n</strong><br>Pour tout $n \\ge 1$, $u_n > 0$. Formons le rapport de <span class=\"term-link\" onclick=\"openConceptModal('theoreme_dalembert')\">d'Alembert</span> :\n$$\\frac{u_{n+1}}{u_n} = \\frac{2^{n+1}(n+1)!}{(n+1)^{n+1}} \\times \\frac{n^n}{2^n n!} = 2\\left(\\frac{n}{n+1}\\right)^n = \\frac{2}{\\left(1 + \\frac{1}{n}\\right)^n}$$<br><br><strong>Étape 2 : Passage à la limite et conclusion</strong><br>Puisque $\\lim_{n \\to +\\infty} \\left(1 + \\frac{1}{n}\\right)^n = e \\approx 2{,}718 > 2$, on obtient :\n$$L = \\lim_{n \\to +\\infty} \\frac{u_{n+1}}{u_n} = \\frac{2}{e} < 1$$\nD'après le critère de d'Alembert, la série $\\sum u_n$ <strong>converge</strong>.",
          "concepts": [
            "series_riemann_bertrand",
            "theoreme_dalembert",
            "convergence_uniforme_sup"
          ]
        },
        {
          "id": "s7_ex3",
          "name": "Arketip Tip 3",
          "subtitle": "Cauchy Kök Testi (n. Kuvvet İfadeleri)",
          "hint": "$n^2$ kuvvetinden kurtulmak için $\\sqrt[n]{u_n}$ kök testini uygulayın.",
          "steps": [
            {
              "title": "Étape 1 : Application de la racine n-ième",
              "content": "Pour $n \\ge 3$, $u_n > 0$. Calculons $\\sqrt[n]{u_n}$ :\n$$\\sqrt[n]{u_n} = \\left[\\left(1 - \\frac{2}{n}\\right)^{n^2}\\right]^{1/n} = \\left(1 - \\frac{2}{n}\\right)^n$$"
            },
            {
              "title": "Étape 2 : Limite classique et conclusion de Cauchy",
              "content": "D'après la limite usuelle $\\lim_{n\\to+\\infty}(1 + \\frac{x}{n})^n = e^x$ pour $x = -2$ :\n$$L = \\lim_{n \\to +\\infty} \\sqrt[n]{u_n} = e^{-2} = \\frac{1}{e^2} < 1$$\nPar le <span class=\"term-link\" onclick=\"openConceptModal('critere_cauchy_racine')\">critère de Cauchy</span>, la série <strong>converge</strong>."
            }
          ],
          "enonce": "Étudier la nature de la série $\\sum_{n \\ge 3} \\left(1 - \\frac{2}{n}\\right)^{n^2}$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Application de la <span class=\"term-link\" onclick=\"openConceptModal('critere_cauchy_racine')\">racine n-ième</span></strong><br>Pour $n \\ge 3$, $u_n > 0$. Calculons $\\sqrt[n]{u_n}$ :\n$$\\sqrt[n]{u_n} = \\left[\\left(1 - \\frac{2}{n}\\right)^{n^2}\\right]^{1/n} = \\left(1 - \\frac{2}{n}\\right)^n$$<br><br><strong>Étape 2 : Limite classique et conclusion de Cauchy</strong><br>D'après la limite usuelle $\\lim_{n\\to+\\infty}(1 + \\frac{x}{n})^n = e^x$ pour $x = -2$ :\n$$L = \\lim_{n \\to +\\infty} \\sqrt[n]{u_n} = e^{-2} = \\frac{1}{e^2} < 1$$\nPar le critère de Cauchy, la série <strong>converge</strong>.",
          "concepts": [
            "critere_cauchy_racine",
            "series_riemann_bertrand",
            "convergence_uniforme_sup"
          ]
        },
        {
          "id": "s7_ex4",
          "name": "Arketip Tip 4",
          "subtitle": "Dizilerde Cauchy Tanımı (ε - N İspatı)",
          "hint": "Üçgen eşitsizliği ile $|1/n - 1/m| \\le 1/n + 1/m \\le 2/N$ üst sınırını kurun.",
          "steps": [
            {
              "title": "Étape 1 : Majoration de |u_n - u_m| pour m, n ≥ N",
              "content": "Soit $\\epsilon > 0$. Pour tous entiers $m, n \\ge N \\ge 1$, on a :\n$$|u_n - u_m| = \\left|\\frac{1}{n} - \\frac{1}{m}\\right| \\le \\frac{1}{n} + \\frac{1}{m} \\le \\frac{1}{N} + \\frac{1}{N} = \\frac{2}{N}$$"
            },
            {
              "title": "Étape 2 : Choix du rang N et conclusion",
              "content": "Choisissons un entier $N > \\frac{2}{\\epsilon}$ (c'est-à-dire $N = \\lfloor \\frac{2}{\\epsilon} \\rfloor + 1$). Alors pour tous $m, n \\ge N$, $|u_n - u_m| < \\epsilon$. La suite $(1/n)$ est donc bien une <strong><span class=\"term-link\" onclick=\"openConceptModal('suites_adjacentes_cauchy')\">suite de Cauchy</span></strong>."
            }
          ],
          "enonce": "Montrer directement à l'aide de la définition ($\\epsilon - N$) que la suite $u_n = \\frac{1}{n}$ ($n \\ge 1$) est une <span class=\"term-link\" onclick=\"openConceptModal('suites_adjacentes_cauchy')\">suite de Cauchy</span>.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Majoration de |u_n - u_m| pour m, n ≥ N</strong><br>Soit $\\epsilon > 0$. Pour tous entiers $m, n \\ge N \\ge 1$, on a :\n$$|u_n - u_m| = \\left|\\frac{1}{n} - \\frac{1}{m}\\right| \\le \\frac{1}{n} + \\frac{1}{m} \\le \\frac{1}{N} + \\frac{1}{N} = \\frac{2}{N}$$<br><br><strong>Étape 2 : Choix du rang N et conclusion</strong><br>Choisissons un entier $N > \\frac{2}{\\epsilon}$ (c'est-à-dire $N = \\lfloor \\frac{2}{\\epsilon} \\rfloor + 1$). Alors pour tous $m, n \\ge N$, $|u_n - u_m| < \\epsilon$. La suite $(1/n)$ est donc bien une <strong><span class=\"term-link\" onclick=\"openConceptModal('suites_adjacentes_cauchy')\">suite de Cauchy</span></strong>.",
          "concepts": [
            "suites_adjacentes_cauchy",
            "series_riemann_bertrand",
            "convergence_uniforme_sup"
          ]
        },
        {
          "id": "s7_ex5",
          "name": "Arketip Tip 5",
          "subtitle": "Süreksizlik ile Düzgün Yakınsaklığı Çürütme",
          "hint": "$x=0$ ve $x \\in ]0, 1]$ için noktasal limiti ayrı ayrı hesaplayın, ardından $x=0$ noktasındaki süreksizliği kullanın.",
          "steps": [
            {
              "title": "Étape 1 : Détermination de la limite simple f(x)",
              "content": "Pour $x = 0$, $f_n(0) = 0 \\to 0$. Pour $x \\in ]0, 1]$, $f_n(x) = \\frac{1}{1 + \\frac{1}{nx}} \\xrightarrow[n\\to+\\infty]{} 1$. La suite $(f_n)$ converge donc simplement sur $[0, 1]$ vers la fonction $f$ définie par $f(0) = 0$ et $f(x) = 1$ sur $]0, 1]$."
            },
            {
              "title": "Étape 2 : Réfutation de la convergence uniforme par continuité",
              "content": "Chaque fonction $f_n$ est continue sur $[0, 1]$, mais la limite simple $f$ est discontinue en $x = 0$ (car $\\lim_{x\\to 0^+} f(x) = 1 \\neq f(0) = 0$). Par contraposée du théorème de continuité sous <span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence uniforme</span>, $(f_n)$ <strong>ne converge pas uniformément</strong> sur $[0, 1]$."
            }
          ],
          "enonce": "Soit $f_n(x) = \\frac{nx}{1+nx}$ définie sur $[0, 1]$. Étudier la <span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence simple</span> et la convergence uniforme de la suite $(f_n)$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Détermination de la limite simple f(x)</strong><br>Pour $x = 0$, $f_n(0) = 0 \\to 0$. Pour $x \\in ]0, 1]$, $f_n(x) = \\frac{1}{1 + \\frac{1}{nx}} \\xrightarrow[n\\to+\\infty]{} 1$. La suite $(f_n)$ converge donc simplement sur $[0, 1]$ vers la fonction $f$ définie par $f(0) = 0$ et $f(x) = 1$ sur $]0, 1]$.<br><br><strong>Étape 2 : Réfutation de la <span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence uniforme</span> par continuité</strong><br>Chaque fonction $f_n$ est continue sur $[0, 1]$, mais la limite simple $f$ est discontinue en $x = 0$ (car $\\lim_{x\\to 0^+} f(x) = 1 \\neq f(0) = 0$). Par contraposée du théorème de continuité sous convergence uniforme, $(f_n)$ <strong>ne converge pas uniformément</strong> sur $[0, 1]$.",
          "concepts": [
            "convergence_uniforme_sup",
            "series_riemann_bertrand",
            "critere_weierstrass"
          ]
        },
        {
          "id": "s7_ex6",
          "name": "Arketip Tip 6",
          "subtitle": "Türevle Tepe Noktası (Supremum) ve Suite Test Bulma",
          "hint": "Noktasal limit $f(x)=0$ sürekli olduğu için $f_n'(x)=0$ denklemini çözerek maksimum noktasını ($x_n = 1/n$) bulun.",
          "steps": [
            {
              "title": "Étape 1 : Limite simple sur [0, 1]",
              "content": "Pour $x = 0$, $f_n(0) = 0$. Pour $x \\in ]0, 1]$, $f_n(x) \\sim \\frac{nx}{n^2 x^2} = \\frac{1}{nx} \\to 0$. La limite simple est donc la fonction nulle $f(x) = 0$ (qui est continue sur $[0, 1]$)."
            },
            {
              "title": "Étape 2 : Calcul de la norme infinie par dérivation",
              "content": "Sur $[0, 1]$, $f_n'(x) = \\frac{n(1 - n^2 x^2)}{(1+n^2 x^2)^2}$, qui s'annule en $x_n = \\frac{1}{n} \\in [0, 1]$. Le maximum vaut :\n$$\\|f_n - 0\\|_{\\infty, [0,1]} = f_n\\left(\\frac{1}{n}\\right) = \\frac{1}{1+1} = \\frac{1}{2} \\not\\to 0$$\nLa convergence <strong>n'est donc pas uniforme</strong> sur $[0, 1]$."
            }
          ],
          "enonce": "Soit $f_n(x) = \\frac{nx}{1+n^2 x^2}$ sur $[0, 1]$. Étudier la <span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence simple</span> et uniforme de $(f_n)$ sur $[0, 1]$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Limite simple sur [0, 1]</strong><br>Pour $x = 0$, $f_n(0) = 0$. Pour $x \\in ]0, 1]$, $f_n(x) \\sim \\frac{nx}{n^2 x^2} = \\frac{1}{nx} \\to 0$. La limite simple est donc la fonction nulle $f(x) = 0$ (qui est continue sur $[0, 1]$).<br><br><strong>Étape 2 : Calcul de la norme infinie par dérivation</strong><br>Sur $[0, 1]$, $f_n'(x) = \\frac{n(1 - n^2 x^2)}{(1+n^2 x^2)^2}$, qui s'annule en $x_n = \\frac{1}{n} \\in [0, 1]$. Le maximum vaut :\n$$\\|f_n - 0\\|_{\\infty, [0,1]} = f_n\\left(\\frac{1}{n}\\right) = \\frac{1}{1+1} = \\frac{1}{2} \\not\\to 0$$\nLa convergence <strong>n'est donc pas uniforme</strong> sur $[0, 1]$.",
          "concepts": [
            "convergence_uniforme_sup",
            "series_riemann_bertrand",
            "critere_weierstrass"
          ]
        },
        {
          "id": "s7_ex7",
          "name": "Arketip Tip 7",
          "subtitle": "Weierstrass M-Testi ve Normal Yakınsaklık",
          "hint": "$|\\sin(nx)| \\le 1$ eşitsizliği ile $x$'ten bağımsız $M_n = 1/n^2$ üst sınırını kurun.",
          "steps": [
            {
              "title": "Étape 1 : Majoration uniforme sur ℝ",
              "content": "Pour tout $x \\in \\mathbb{R}$ et tout $n \\ge 1$, on a $\\left|\\frac{\\sin(nx)}{n^2}\\right| \\le \\frac{1}{n^2}$, d'où $\\|u_n\\|_{\\infty, \\mathbb{R}} \\le \\frac{1}{n^2} = M_n$."
            },
            {
              "title": "Étape 2 : Critère de Weierstrass et chaîne d'implications",
              "content": "La série numérique $\\sum \\frac{1}{n^2}$ est une <span class=\"term-link\" onclick=\"openConceptModal('series_riemann_bertrand')\">série de Riemann</span> convergente ($\\alpha = 2 > 1$). Par le <span class=\"term-link\" onclick=\"openConceptModal('critere_weierstrass')\">critère de Weierstrass</span>, $\\sum u_n$ <strong>converge normalement</strong> sur $\\mathbb{R}$, ce qui implique sa convergence <strong>uniforme, absolue et simple</strong> sur $\\mathbb{R}$."
            }
          ],
          "enonce": "Étudier la <span class=\"term-link\" onclick=\"openConceptModal('critere_weierstrass')\">convergence normale</span>, uniforme, absolue et simple de la série de fonctions $\\sum_{n \\ge 1} \\frac{\\sin(nx)}{n^2}$ sur $\\mathbb{R}$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Majoration uniforme sur ℝ</strong><br>Pour tout $x \\in \\mathbb{R}$ et tout $n \\ge 1$, on a $\\left|\\frac{\\sin(nx)}{n^2}\\right| \\le \\frac{1}{n^2}$, d'où $\\|u_n\\|_{\\infty, \\mathbb{R}} \\le \\frac{1}{n^2} = M_n$.<br><br><strong>Étape 2 : <span class=\"term-link\" onclick=\"openConceptModal('critere_weierstrass')\">Critère de Weierstrass</span> et chaîne d'implications</strong><br>La série numérique $\\sum \\frac{1}{n^2}$ est une <span class=\"term-link\" onclick=\"openConceptModal('series_riemann_bertrand')\">série de Riemann</span> convergente ($\\alpha = 2 > 1$). Par le critère de Weierstrass, $\\sum u_n$ <strong>converge normalement</strong> sur $\\mathbb{R}$, ce qui implique sa convergence <strong>uniforme, absolue et simple</strong> sur $\\mathbb{R}$.",
          "concepts": [
            "critere_weierstrass",
            "series_riemann_bertrand",
            "convergence_uniforme_sup"
          ]
        },
        {
          "id": "s7_ex8",
          "name": "Arketip Tip 8",
          "subtitle": "Teleskopik Fonksiyon Serisi ve Toplam Sürekliliği",
          "hint": "Genel terimi $\\frac{1}{1+nx} - \\frac{1}{1+(n+1)x}$ şeklinde basit kesirlere ayırarak kısmi toplam $S_N(x)$'i hesaplayın.",
          "steps": [
            {
              "title": "Étape 1 : Décomposition télescopique et somme partielle S_N(x)",
              "content": "On remarque que $u_n(x) = \\frac{1}{1+nx} - \\frac{1}{1+(n+1)x}$. Par <span class=\"term-link\" onclick=\"openConceptModal('series_telescopiques_absolue')\">télescopage</span> :\n$$S_N(x) = \\sum_{n=1}^N u_n(x) = \\frac{1}{1+x} - \\frac{1}{1+(N+1)x}$$"
            },
            {
              "title": "Étape 2 : Somme simple S(x) et non-convergence uniforme",
              "content": "Pour $x = 0$, $S_N(0) = 0 \\to S(0) = 0$. Pour $x > 0$, $S_N(x) \\to S(x) = \\frac{1}{1+x}$. Comme $\\lim_{x\\to 0^+} S(x) = 1 \\neq S(0) = 0$, la somme $S$ est discontinue en $0$ alors que chaque $u_n$ est continue : la série <strong>ne converge pas uniformément</strong> sur $[0, +\\infty[$."
            }
          ],
          "enonce": "Calculer la somme simple et étudier la <span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence uniforme</span> de la série $\\sum_{n=1}^{+\\infty} \\frac{x}{(1+nx)(1+(n+1)x)}$ sur $[0, +\\infty[$.",
          "tag": "Master Vize",
          "solTitle": "Ayrıntılı Sınav Çözümü (Rédaction Complète)",
          "solution": "<strong>Étape 1 : Décomposition télescopique et <span class=\"term-link\" onclick=\"openConceptModal('series_telescopiques_absolue')\">somme partielle</span> S_N(x)</strong><br>On remarque que $u_n(x) = \\frac{1}{1+nx} - \\frac{1}{1+(n+1)x}$. Par télescopage :\n$$S_N(x) = \\sum_{n=1}^N u_n(x) = \\frac{1}{1+x} - \\frac{1}{1+(N+1)x}$$<br><br><strong>Étape 2 : Somme simple S(x) et non-<span class=\"term-link\" onclick=\"openConceptModal('convergence_uniforme_sup')\">convergence uniforme</span></strong><br>Pour $x = 0$, $S_N(0) = 0 \\to S(0) = 0$. Pour $x > 0$, $S_N(x) \\to S(x) = \\frac{1}{1+x}$. Comme $\\lim_{x\\to 0^+} S(x) = 1 \\neq S(0) = 0$, la somme $S$ est discontinue en $0$ alors que chaque $u_n$ est continue : la série <strong>ne converge pas uniformément</strong> sur $[0, +\\infty[$.",
          "concepts": [
            "convergence_uniforme_sup",
            "series_telescopiques_absolue",
            "series_riemann_bertrand"
          ]
        }
      ],
      "breadcrumb": "MAT201 > Modül 7 > Sınav Master Özeti & Karar Ağaçları",
      "concepts": [
        "theoreme_dalembert",
        "critere_cauchy_racine",
        "critere_leibniz_series",
        "critere_weierstrass",
        "theoreme_point_fixe"
      ],
      "theoryPages": [
        {
          "title": "1. Sayısal Seriler Karar Ağacı (Sınav Algoritması)",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Vize Master Özeti</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Sayısal Seriler Hızlı Karar Ağacı</h2>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">Adım 0: Genel Terim Testi (Refleks)</div>\n  <div class=\"theory-box-body\">\n    $$ \\lim_{n\\to\\infty} u_n \\neq 0 \\implies \\sum u_n \\text{ DIVERGE GROSSIÈREMENT (İşlem bitti!)} $$\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Pozitif Terimli Seriler İçin Karar Matrisi ($u_n \\ge 0$)</div>\n  <div class=\"theory-box-body\">\n    <ol>\n      <li><strong>Faktöriyel ($n!$) veya Üstel ($a^n$) varsa $\\implies$ D'ALEMBERT ORAN TESTİ :</strong><br>\n      $\\lim \\frac{u_{n+1}}{u_n} = L$. ($L < 1$ CV, $L > 1$ DV).</li>\n      <li><strong>Parantezin tamamında $n$. kuvvet varsa $\\implies$ CAUCHY KÖK TESTİ :</strong><br>\n      $\\lim \\sqrt[n]{u_n} = L$. ($L < 1$ CV, $L > 1$ DV).</li>\n      <li><strong>Rasyonel veya köklü ifadeler varsa $\\implies$ ASİMPTOTİK EŞDEĞERLİK ($\\sim$) :</strong><br>\n      Pay ve paydanın en baskın terimleri alınarak $u_n \\sim \\frac{c}{n^\\alpha}$ bulunur ve Riemann serisiyle kıyaslanır.</li>\n      <li><strong>İçinde $\\ln n$ olan terimler varsa $\\implies$ BERTRAND SERİSİ / İNTEGRAL :</strong><br>\n      $\\sum \\frac{1}{n^\\alpha (\\ln n)^\\beta}$ formuna sokulur.</li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">İşareti Değişen / Alterne Seriler İçin Karar Matrisi ($(-1)^n a_n$)</div>\n  <div class=\"theory-box-body\">\n    <ol>\n      <li><strong>1. Hamle (Mutlak Değer):</strong> $\\sum |u_n| = \\sum a_n$ incelenir. Eğer yakınsarsa seri <strong>mutlak yakınsaktır</strong> (CV absolue).</li>\n      <li><strong>2. Hamle (Leibniz Kriteri):</strong> Eğer $\\sum |u_n|$ ıraksıyorsa, $a_n \\ge 0$, azalan ve $a_n \\to 0$ şartları kontrol edilir. Sağlanıyorsa seri <strong>şartlı yakınsaktır</strong> (Semi-convergente).</li>\n    </ol>\n  </div>\n</div>\n"
        },
        {
          "title": "2. Fonksiyon Serileri & Vize 8 Soru Tipi Karar Ağacı",
          "html": "\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Vize Master Özeti</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Fonksiyon Dizileri ve Serileri Sınav Yol Haritası</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Fonksiyon Dizisi $(f_n)$ Sorularında 3 Adımlı Şablon</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>1. Adım:</strong> $x$'i sabitleyip $n\\to\\infty$ iken noktasal limit $f(x)$ fonksiyonunu bul (CVS).</li>\n      <li><strong>2. Adım:</strong> Süreksizlik kontrolü yap: Eğer her $f_n$ sürekli ama limit $f$ süreksiz ise CVU yoktur!</li>\n      <li><strong>3. Adım:</strong> Eğer $f$ sürekli ise $\\|f_n - f\\|_\\infty = \\sup |f_n(x) - f(x)|$ hesapla (türev alarak tepe noktasını bul). Eğer supremum $0$'a gidiyorsa CVU vardır; gitmiyorsa tepe noktasını veren $x_n$ dizisiyle CVU çürütülür.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Fonksiyon Serisi $\\sum f_n(x)$ Sorularında Refleks</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>İlk Hedef: Normal Yakınsaklık (CVN) :</strong> $|f_n(x)| \\le M_n$ olacak şekilde bağımsız bir $M_n$ sayısı bul. Eğer $\\sum M_n$ yakınsıyorsa Weierstrass teoremiyle seri normal, düzgün ve mutlak yakınsar! Toplam fonksiyonu da süreklidir.</li>\n      <li><strong>CVN Yoksa Düzgün Yakınsaklık (CVU) :</strong> Kalan terim $R_N(x) = \\sum_{n=N+1}^\\infty f_n(x)$ supremum sınırına bakılır veya terim terime Leibniz kalanı uygulanır.</li>\n    </ul>\n  </div>\n</div>\n"
        }
      ],
      "theoryContent": "<div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">1. Sayısal Seriler Karar Ağacı (Sınav Algoritması)</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Vize Master Özeti</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Sayısal Seriler Hızlı Karar Ağacı</h2>\n</div>\n\n<div class=\"theory-box alert\">\n  <div class=\"theory-box-title\">Adım 0: Genel Terim Testi (Refleks)</div>\n  <div class=\"theory-box-body\">\n    $$ \\lim_{n\\to\\infty} u_n \\neq 0 \\implies \\sum u_n \\text{ DIVERGE GROSSIÈREMENT (İşlem bitti!)} $$\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Pozitif Terimli Seriler İçin Karar Matrisi ($u_n \\ge 0$)</div>\n  <div class=\"theory-box-body\">\n    <ol>\n      <li><strong>Faktöriyel ($n!$) veya Üstel ($a^n$) varsa $\\implies$ D'ALEMBERT ORAN TESTİ :</strong><br>\n      $\\lim \\frac{u_{n+1}}{u_n} = L$. ($L < 1$ CV, $L > 1$ DV).</li>\n      <li><strong>Parantezin tamamında $n$. kuvvet varsa $\\implies$ CAUCHY KÖK TESTİ :</strong><br>\n      $\\lim \\sqrt[n]{u_n} = L$. ($L < 1$ CV, $L > 1$ DV).</li>\n      <li><strong>Rasyonel veya köklü ifadeler varsa $\\implies$ ASİMPTOTİK EŞDEĞERLİK ($\\sim$) :</strong><br>\n      Pay ve paydanın en baskın terimleri alınarak $u_n \\sim \\frac{c}{n^\\alpha}$ bulunur ve Riemann serisiyle kıyaslanır.</li>\n      <li><strong>İçinde $\\ln n$ olan terimler varsa $\\implies$ BERTRAND SERİSİ / İNTEGRAL :</strong><br>\n      $\\sum \\frac{1}{n^\\alpha (\\ln n)^\\beta}$ formuna sokulur.</li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">İşareti Değişen / Alterne Seriler İçin Karar Matrisi ($(-1)^n a_n$)</div>\n  <div class=\"theory-box-body\">\n    <ol>\n      <li><strong>1. Hamle (Mutlak Değer):</strong> $\\sum |u_n| = \\sum a_n$ incelenir. Eğer yakınsarsa seri <strong>mutlak yakınsaktır</strong> (CV absolue).</li>\n      <li><strong>2. Hamle (Leibniz Kriteri):</strong> Eğer $\\sum |u_n|$ ıraksıyorsa, $a_n \\ge 0$, azalan ve $a_n \\to 0$ şartları kontrol edilir. Sağlanıyorsa seri <strong>şartlı yakınsaktır</strong> (Semi-convergente).</li>\n    </ol>\n  </div>\n</div>\n</div><div class=\"theory-page-section\" style=\"margin-bottom: 30px;\"><h2 class=\"book-sec-title\" style=\"color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px; font-size: 1.35rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;\">2. Fonksiyon Serileri & Vize 8 Soru Tipi Karar Ağacı</h2>\n<div class=\"chapter-banner\" style=\"background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.08)); border-left: 4px solid var(--accent-blue); border-radius: 6px; padding: 16px 20px; margin-bottom: 20px;\">\n  <span style=\"font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); letter-spacing: 0.05em;\">Vize Master Özeti</span>\n  <h2 style=\"font-size: 1.35rem; margin: 4px 0 0; color: var(--text-main); font-weight: 700;\">Fonksiyon Dizileri ve Serileri Sınav Yol Haritası</h2>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Fonksiyon Dizisi $(f_n)$ Sorularında 3 Adımlı Şablon</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>1. Adım:</strong> $x$'i sabitleyip $n\\to\\infty$ iken noktasal limit $f(x)$ fonksiyonunu bul (CVS).</li>\n      <li><strong>2. Adım:</strong> Süreksizlik kontrolü yap: Eğer her $f_n$ sürekli ama limit $f$ süreksiz ise CVU yoktur!</li>\n      <li><strong>3. Adım:</strong> Eğer $f$ sürekli ise $\\|f_n - f\\|_\\infty = \\sup |f_n(x) - f(x)|$ hesapla (türev alarak tepe noktasını bul). Eğer supremum $0$'a gidiyorsa CVU vardır; gitmiyorsa tepe noktasını veren $x_n$ dizisiyle CVU çürütülür.</li>\n    </ul>\n  </div>\n</div>\n\n<div class=\"theory-box thm\">\n  <div class=\"theory-box-title\">Fonksiyon Serisi $\\sum f_n(x)$ Sorularında Refleks</div>\n  <div class=\"theory-box-body\">\n    <ul>\n      <li><strong>İlk Hedef: Normal Yakınsaklık (CVN) :</strong> $|f_n(x)| \\le M_n$ olacak şekilde bağımsız bir $M_n$ sayısı bul. Eğer $\\sum M_n$ yakınsıyorsa Weierstrass teoremiyle seri normal, düzgün ve mutlak yakınsar! Toplam fonksiyonu da süreklidir.</li>\n      <li><strong>CVN Yoksa Düzgün Yakınsaklık (CVU) :</strong> Kalan terim $R_N(x) = \\sum_{n=N+1}^\\infty f_n(x)$ supremum sınırına bakılır veya terim terime Leibniz kalanı uygulanır.</li>\n    </ul>\n  </div>\n</div>\n</div>"
    }
  }
};
