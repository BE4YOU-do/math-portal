# ALGÈBRE ABSTRAITE - TD 2

## 1. EXERCICES

**1.** Montrer que l'ensemble $\mathbb{R}$ muni de la loi
$x \star y = (x^3 + y^3)^{\frac{1}{3}}$
est un groupe.

**2.** Soit $A = \mathbb{R}^2 \setminus \{(0, 0)\}$ muni de la loi
$(a, b) \star (a', b') = (aa' - bb', ab' + a'b)$
est un groupe.

**3.** Montrer que les deux matrices complexes $A = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ et $B = \begin{pmatrix} 0 & i \\ -i & 0 \end{pmatrix}$ engendrent un groupe non-abélien d'ordre 8.

**4.** Lesquelles des opérations binaires suivantes sont closes?
a. soustraction d'entiers positifs,
b. division d'entiers non nuls,
c. composition de fonctions de polynômes à coefficients réels,
d. multiplication de matrices $2 \times 2$ à éléments entiers.

**5.** Lesquelles des opérations binaires suivantes sont associatives?
a. multiplication $\pmod n$,
b. division de rationnels non nuls,
c. composition de fonctions de polynômes à coefficients réels,
d. multiplication de matrices $2 \times 2$ à éléments entiers.

**6.** Lesquelles des opérations binaires suivantes sont commutatives?
a. soustraction d'entiers,
b. division de réels non nuls,
c. composition de fonctions de polynômes à coefficients réels,
d. multiplication de matrices $2 \times 2$ à éléments réels.

**7.** Lesquels des ensembles suivants sont fermés par l'opération donnée?
a. $\{0, 4, 8, 12\}$ addition $\pmod{16}$,
b. $\{0, 4, 8, 12\}$ ajout $\pmod{15}$,
c. $\{1, 4, 7, 13\}$ multiplication $\pmod{15}$,
d. $\{1, 4, 5, 7\}$ multiplication $\pmod 9$.

**8.** Dans chaque cas, trouver l'inverse de l'élément par l'opération donnée.
a. 13 dans $Z_{20}$,
b. 13 dans $U(14)$,
c. $n - 1$ dans $U(n)$ ($n > 2$),
d. $3 - 2i$ dans $\mathbb{C}^*$, le groupe des nombres complexes non nuls par multiplication.

**9.** Dans chaque cas, effectuer l'opération indiquée.
a. Dans $\mathbb{C}^*$, $(7 + 5i)(-3 + 2i)$,
b. Dans $GL(2, Z_{13})$, $\det \begin{bmatrix} 7 & 4 \\ 1 & 5 \end{bmatrix}$,
c. Dans $GL(2, \mathbb{R})$, $\begin{bmatrix} 6 & 3 \\ 8 & 2 \end{bmatrix}^{-1}$,
d. Dans $GL(2, Z_{13})$, $\begin{bmatrix} 6 & 3 \\ 8 & 2 \end{bmatrix}^{-1}$.

**10.** Donnez deux raisons pour lesquelles l'ensemble des entiers impairs additionnés n'est pas un groupe.

**11.** Montrer que l'ensemble $\{5, 15, 25, 35\}$ est un groupe multiplié par 40. Quel est l'élément neutre de ce groupe ? Existe-t-il une relation entre ce groupe et $U(8)$ ?

**12.** Démontrer qu'un groupe $G$ est abélien si et seulement si $(ab)^{-1} = a^{-1}b^{-1}$ pour tout $a$ et $b$ dans $G$.

**13.** Construire une table de Cayley pour $U(12)$.

**14.** Supposons que $F_1$ et $F_2$ soient des symétries distinctes dans un groupe dièdre $D_n$. Démontrer que $F_1F_2 \neq R_0$.

**15.** Supposons que $F_1$ et $F_2$ soient des symétries distinctes dans un groupe dièdre $D_n$ tel que $F_1F_2 = F_2F_1$. Démontrer que $F_1F_2 = R_{180}$.

**16.** Dans le groupe diédral $D_n$, soit $R = R_{360/n}$ et soit $F$ une symétrie quelconque. Écrire chacun des produits suivants sous la forme $R^i$ ou $R^iF$, où $0 \leq i < n$.
a. Dans $D_4$, $F R^{-2}F R^5$,
b. Dans $D_5$, $R^{-3}F R^4F R^{-2}$,
c. Dans $D_6$, $F R^5F R^{-2}F$.

**17.** Démontrer que l'ensemble de tous les nombres rationnels de la forme $3^m 6^n$, où $m$ et $n$ sont des entiers, est un groupe par multiplication.

**18.** Démontrer que l'ensemble de toutes les $3 \times 3$ matrices à éléments réels de la forme
$\begin{pmatrix} 1 & a & b \\ 0 & 1 & c \\ 0 & 0 & 1 \end{pmatrix}$
est un groupe. (Ce groupe, parfois appelé groupe de Heisenberg, est intimement lié au principe d'incertitude de Heisenberg de la physique quantique.)

**19.** (a) Soit $G = \left\{ \begin{bmatrix} a & a \\ a & a \end{bmatrix} \mid a \in \mathbb{R}, a \neq 0 \right\}$. Montrer que $G$ est un groupe par multiplication matricielle. Expliquer pourquoi chaque élément de $G$ possède un inverse, même si les matrices ont un déterminant de 0.

**20.** Dans $GL(2, Z_{13})$, calculer $\begin{pmatrix} 6 & 3 \\ 8 & 2 \end{pmatrix}^{-1}$.

**21.** Pour chaque groupe suivant, déterminez l'ordre du groupe et celui de chaque élément du groupe. Quelle relation observez-vous entre l'ordre des éléments d'un groupe et l'ordre du groupe ?
$Z_{12}, \quad U(10), \quad U(12), \quad U(20), \quad D_4$

**22.** Démontrer que dans tout groupe, un élément et son inverse ont le même ordre.

**23.** Que peut-on dire d'un sous-groupe de $D_3$ contenant $R_{240}$ et une réflexion $F$? Que peut-on dire d'un sous-groupe de $D_3$ contenant deux réflexions?

**24.** Combien de sous-groupes d'ordre 4 possède $D_4$?

**25.** Montrez que $U(14) = \langle 3 \rangle = \langle 5 \rangle$. Est-ce que $U(14) = \langle 11 \rangle$?

**26.** Dans le groupe $Z$, calculer
a. $\langle 8, 13 \rangle$,
b. $\langle 6, 15 \rangle$,
c. $\langle 12, 18, 45 \rangle$.

**27.** Si $H$ est un sous-groupe de $G$, alors par centralisateur $C(H)$ de $H$ on entend l'ensemble $\{x \in G \mid xh = hx \text{ pour tout } h \in H\}$. Démontrer que $C(H)$ est un sous-groupe de $G$.

**28.** En utilisant les matrices
$i \mapsto \begin{pmatrix} i & 0 \\ 0 & -i \end{pmatrix}, \quad j \mapsto \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, \quad k \mapsto \begin{pmatrix} 0 & i \\ i & 0 \end{pmatrix}$
construire la table de Cayley du groupe de quaternions.
(b) Une autre façon de voir: Les quaternions $Q = \{\pm 1, \pm i, \pm j, \pm k\}$ est un groupe par rapport à la multiplication avec les relations:
$i^2 = j^2 = k^2 = -1$,
$ij = k, \quad jk = i, \quad ki = j$,
et les produits dans l'ordre inverse prennent un signe moins :
$ji = -k, \quad kj = -i, \quad ik = -j$
