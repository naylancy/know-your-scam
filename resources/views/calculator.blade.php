<!DOCTYPE html>
<html>
<head>
    <title>Kalkulator Laravel</title>
</head>
<body>

    <h1>Kalkulator</h1>

    <form action="/calculator" method="POST">
        @csrf

        <input type="number" name="angka1" placeholder="Angka pertama" required>

        <select name="operator">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
        </select>

        <input type="number" name="angka2" placeholder="Angka kedua" required>

        <button type="submit">Hitung</button>
    </form>

    @isset($hasil)
        <h2>Hasil: {{ $hasil }}</h2>
    @endisset

</body>
</html>