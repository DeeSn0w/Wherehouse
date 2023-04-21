-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 21. 12:07
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `wherehousedb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkalmazott`
--

CREATE TABLE `alkalmazott` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `pozicio` varchar(75) NOT NULL,
  `fizetes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `alkalmazott`
--

INSERT INTO `alkalmazott` (`id`, `nev`, `pozicio`, `fizetes`) VALUES
(1, 'Teszt Imre', 'Adminisztrátor', 500000),
(2, 'Teszt János', 'Asszisztens', 1000000),
(3, 'Teszt Lajos', 'Raktárkezelő', 800000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `birtokolt`
--

CREATE TABLE `birtokolt` (
  `id` int(11) NOT NULL,
  `raktarid` int(11) NOT NULL,
  `tulajid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `raktar`
--

CREATE TABLE `raktar` (
  `id` int(11) NOT NULL,
  `cím` varchar(100) NOT NULL,
  `tipus` varchar(50) NOT NULL,
  `ar` int(20) NOT NULL,
  `meret` varchar(30) NOT NULL,
  `kepurl` varchar(255) NOT NULL,
  `elvittek` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `raktar`
--

INSERT INTO `raktar` (`id`, `cím`, `tipus`, `ar`, `meret`, `kepurl`, `elvittek`) VALUES
(1, 'Miskolc, valami utca 69', 'Késztermék raktár', 160000, '150', 'https://media.angi.com/s3fs-public/outdoor-storage-units.jpeg', 0),
(2, 'Budapest, valami utca 68', 'Party kellék raktár', 200000, '100', 'https://uploads.website.storedge.com/187fb2c8-4cb9-42c1-a2a5-46f19ac48d4f/drive_up_storage.jpg', 0),
(3, 'Emőd, valami utca 60', 'Vegyes raktár', 300000, '200', 'https://res.cloudinary.com/g5-assets-cld/image/upload/x_353,y_686,h_1980,w_3299,c_crop/q_auto,f_auto,fl_lossy,g_center,h_1200,w_2000/g5/g5-c-i9zw9qpa-aaa-self-storage-client/g5-cl-iafp91gw-aaa-self-storage-2/uploads/AAA_1601_Brookford_Ind_Dr-9_gtm9cl.jpg', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tulajdonos`
--

CREATE TABLE `tulajdonos` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tulajdonos`
--

INSERT INTO `tulajdonos` (`id`, `nev`, `email`, `password`) VALUES
(1, 'admin', 'admin@admin.hu', 'admin'),
(2, 'teszt', 'teszt@gmail.com', 'teszt');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20230420060708_initial', '7.0.3');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkalmazott`
--
ALTER TABLE `alkalmazott`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `birtokolt`
--
ALTER TABLE `birtokolt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `raktarid` (`raktarid`),
  ADD KEY `tulajid` (`tulajid`);

--
-- A tábla indexei `raktar`
--
ALTER TABLE `raktar`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tulajdonos`
--
ALTER TABLE `tulajdonos`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkalmazott`
--
ALTER TABLE `alkalmazott`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `birtokolt`
--
ALTER TABLE `birtokolt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `raktar`
--
ALTER TABLE `raktar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `tulajdonos`
--
ALTER TABLE `tulajdonos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `birtokolt`
--
ALTER TABLE `birtokolt`
  ADD CONSTRAINT `birtokolt_ibfk_1` FOREIGN KEY (`raktarid`) REFERENCES `raktar` (`id`),
  ADD CONSTRAINT `birtokolt_ibfk_2` FOREIGN KEY (`tulajid`) REFERENCES `tulajdonos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
