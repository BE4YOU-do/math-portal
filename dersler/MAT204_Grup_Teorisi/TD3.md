# ALGÈBRE ABSTRAITE - TD 3

## 1. EXERCICES

**1.** Donner la liste des sous-groupes cycliques du group $\mathbb{Z}_{30}$.

**2.** Soit $G$ un groupe. Soit $g \in G$ d'ordre $m$. Montrer que $g^n = e$ si et seulement si $m$ divise $n$.

**3.** Montrer que, dans un groupe cyclique fini, l'ordre d'un élément divise l'ordre du groupe.

**4.** On sait qu'une racine $n$-ième d'unité est un nombre complexe $z$ qui satisfait l'équation $z^n = 1$. Une racine primitive $n$-ième d'unité est une racine $n$-ième d'unité dont aucune puissance inférieure à $n$ n'est égale à 1; c'est à dire une racine $\xi_k = e^{\frac{2i\pi k}{n}}$ est primitive si et seulement si $\gcd(k, n) = 1$.

Par exemple, les solutions de $z^3 = 1$ sont $1, e^{2i\pi/3}, e^{4i\pi/3}$; on les appelle les racines 3-ième d'unité.
- $1^1 = 1$. Donc la racine 1 n'est pas primitive.
- $(e^{2i\pi/3})^1 = e^{2i\pi/3} \neq 1$, $(e^{2i\pi/3})^2 = e^{4i\pi/3} \neq 1$, $(e^{2i\pi/3})^3 = e^{2i\pi} = 1$. Donc $e^{2i\pi/3}$ est une racine primitive (devient 1 à la puissance 3).
- $(e^{4i\pi/3})^1 = e^{4i\pi/3} \neq 1$, $(e^{4i\pi/3})^2 = e^{8i\pi/3} = e^{2i\pi/3} \neq 1$, $(e^{4i\pi/3})^3 = e^{4i\pi} = 1$. Donc $e^{4i\pi/3}$ est aussi primitive.

Donner toutes les racines 12-ième d'unité de $z^{12} = 1$. Quelles sont les racines primitives?

**5.** Résoudre $z^3 - 2 = 0$.

**6.** Montrer que tout sous-groupe d'un groupe cyclique est cyclique.

**7.** Si $G$ est un groupe et $H, K \leq G$, montrer que $HK \leq G$ si et seulement si $HK = KH$.
