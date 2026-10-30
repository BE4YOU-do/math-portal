# Grup Teorisi ve Cebir - Dönemlik Çalışma Notları

Bu doküman, dönem boyunca işlenen konuları, önemli teoremleri, formülleri ve soru çözüm taktiklerini haftalık olarak biriktirdiğimiz sürekli güncellenen bir başvuru kaynağıdır.

---

## Hafta 1: Tam Sayılarda Aritmetik ve Modüler Kavramlar (Arithmétique dans Z)

### 1. Bölünebilme (Divisibilité)
- Tanım: A sayısı B sayısını bölüyorsa, B = A * K şeklinde bir K tam sayısı vardır.
- Doğrusal Kombinasyon: Eğer "d" sayısı hem "a"yı hem "b"yi bölüyorsa, her türlü "a*x + b*y" toplamını da böler.
  - Soru Tipi: "d sayısı 2n+1'i ve 3n+2'yi bölüyorsa..." tarzında sorularda, "n" harfini yok edecek sayılarla çarpıp birbirinden çıkararak d'nin böleceği sabit bir sayı buluruz.

### 2. Öklid Bölme Teoremi
- Kural: Bölünen = Bölen * Bölüm + Kalan (A = B * Q + R)
- Şart: Kalan her zaman 0'a eşit veya büyük, bölenden ise kesinlikle küçük olmalıdır.
- Uygulama: Tek/Çift sayı kavramı aslında sayıyı 2'ye bölmektir. (Kalan 0 ise 2m, kalan 1 ise 2m+1 olur).

### 3. En Büyük Ortak Bölen (EBOB / PGCD)
- Öklid Algoritması: İki sayının EBOB'unu bulmak için onları sürekli birbirine böleriz. Kalan sıfır olana kadar devam ederiz. Sıfırdan önceki son kalan EBOB'dur.
- Kural: Ortak bölenlerin tümü EBOB'u da bölmek zorundadır.

### 4. Bézout Teoremi
- Teorem: "a" ve "b" sayılarının EBOB'u "d" ise, öyle s ve t tam sayıları vardır ki: (a * s) + (b * t) = d olur.
- Aralarında Asallık: Eğer (a * s) + (b * t) = 1 ise, bu sayıların EBOB'u KESİNLİKLE 1'dir (Aralarında asaldır).
- Dikkat: Bu denklemin sonucu örneğin 7 çıkarsa, EBOB 7'dir DİYEMEYİZ. Sadece EBOB 7'yi tam bölüyor diyebiliriz. Kesinlik sadece sonuç 1 iken vardır.

### 5. Modüler Aritmetik
- Tanım: a = b (Mod n) demek, "a" ve "b" sayılarının "n"ye bölümünden kalanlarının aynı olması demektir. 
- Kurallar: 
  - Toplama ve çarpma yapılabilir. İşlemleri yapmadan önce sayıların kalanlarını bularak onlarla işlem yapabilirsiniz.
  - Üs alınabilir: İki tarafın da aynı kuvveti alınabilir.
- Taktikler:
  - Büyük sayıları çarpmadan/toplamadan önce hemen mod'a göre küçültün.
  - Kalan negatif çıkarsa, modül ekleyerek pozitife çevirin (Örnek: Mod 9'da -3 buldunuz, -3 + 9 = 6 kalanı kullanılır).
  - Bilinmeyenli denklem çözüyorsanız, bilinenleri bir tarafa atıp katsayıları sadeleştirmeye çalışın.
