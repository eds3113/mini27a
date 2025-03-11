<<<<<<< HEAD
# Topluluk Bağlantı Yöneticisi

Bu proje, topluluk yönetimi için kullanılan YouTube videoları, Excel şablonları ve diğer önemli bağlantıları kategorilere ayırarak saklayan ve yöneten bir web uygulamasıdır.

## Özellikler

- Bağlantıları üç farklı kategoride saklama: YouTube, Yönetim ve Diğer
- Kategoriye göre filtreleme
- Başlık ve açıklamada arama yapabilme
- Duyarlı ve kullanıcı dostu arayüz
- GitHub Pages üzerinde ücretsiz barındırma

## Nasıl Kullanılır

Proje, GitHub Pages üzerinde yayımlanmış olarak kullanılabilir:

```
https://yourusername.github.io/link-manager
```

Yerel olarak geliştirmek veya çalıştırmak için:

1. Repoyu klonlayın:
```
git clone https://github.com/yourusername/link-manager.git
```

2. Proje klasörüne gidin ve bağımlılıkları yükleyin:
```
cd link-manager
npm install
```

3. Geliştirme sunucusunu başlatın:
```
npm start
```

4. Tarayıcınızda görüntüleyin:
```
http://localhost:3000
```

## GitHub Pages'e Deploy Etme

Projedeki değişiklikleri GitHub Pages'e deploy etmek için:

```
npm run deploy
```

Bu komut, projeyi derleyip GitHub Pages dalına yükleyecektir.

## Veri Yönetimi

Şu anda bağlantılar, kaynak koddaki bir JSON dosyasında (`src/data/links.json`) statik olarak saklanmaktadır. Gerçek bir uygulama için, aşağıdaki seçenekleri değerlendirebilirsiniz:

1. **GitHub üzerinde JSON dosyasını düzenlemek**: Küçük değişiklikler için, doğrudan GitHub arayüzünden JSON dosyasını düzenleyip commit edebilirsiniz.

2. **Firebase/Firestore kullanmak**: Daha dinamik bir çözüm için, ücretsiz bir Firebase hesabı oluşturup verileri gerçek zamanlı bir veritabanında saklayabilirsiniz.

3. **Supabase veya diğer BaaS (Backend as a Service) hizmetleri**: Firebase'e alternatif olarak Supabase gibi çözümler de kullanılabilir.

## Katkıda Bulunma

1. Bu repoyu forklayın
2. Özellik dalınızı oluşturun: `git checkout -b yeni-ozellik`
3. Değişikliklerinizi commit edin: `git commit -m 'Yeni özellik eklendi'`
4. Dalınızı uzak depoya itin: `git push origin yeni-ozellik`
5. Bir Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
=======

>>>>>>> ebf12b04481dfa72b56bdba441d9c6fd9ccabd1c
