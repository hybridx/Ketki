-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 13, 2019 at 12:02 AM
-- Server version: 5.7.26-log
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ketkicli_ketki`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `gender` enum('m','f','o') NOT NULL,
  `age` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `booking_time` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `name`, `phone`, `gender`, `age`, `booking_date`, `booking_time`, `timestamp`) VALUES
(9, 'Deepesh Nair', '9923069194', 'm', 24, '2019-06-24', 2, '2019-06-23 17:41:30'),
(10, 'First Last', '9923069194', 'o', 24, '2019-06-24', 6, '2019-06-29 15:15:49'),
(11, 'First Last', '7709539466', 'o', 24, '2019-06-24', 6, '2019-06-29 16:36:59'),
(12, 'First Last', '9923069194', 'o', 123, '2019-06-24', 4, '2019-06-29 22:01:33'),
(13, 'sachin', '7972761594', 'm', 22, '2019-06-29', 22, '2019-06-29 22:39:11'),
(14, 'sachin', '7972761594', 'm', 23, '2019-06-29', 22, '2019-06-29 22:41:09'),
(15, 'sachin', '7972761594', 'm', 22, '2019-06-30', 20, '2019-06-29 22:53:59'),
(16, 'sachin', '7972761594', 'm', 22, '2019-06-30', 22, '2019-06-29 22:58:05'),
(17, 'Vishesh', '7972761594', 'm', 23, '2019-06-30', 23, '2019-06-29 23:06:30'),
(18, 'sachin', '7972761594', 'm', 23, '2019-06-30', 23, '2019-06-29 23:19:07'),
(19, 'sachin', '7972761594', 'm', 12, '2019-06-30', 23, '2019-06-29 23:22:57'),
(20, 'sachin', '7972761594', 'm', 23, '2019-07-01', 11, '2019-06-30 19:48:37'),
(21, 'sachin', '7972761594', 'm', 23, '2019-07-01', 20, '2019-06-30 19:54:03'),
(22, 'sachin', '7972761594', 'm', 23, '2019-07-01', 20, '2019-06-30 19:54:04'),
(23, 'sachin', '7972761594', 'm', 23, '2019-07-01', 20, '2019-06-30 19:57:46'),
(24, 'Deepesh Nair', '9923069194', 'm', 24, '2019-07-01', 22, '2019-06-30 21:20:03'),
(25, 'deepesh', '9923069194', 'm', 25, '2019-07-01', 18, '2019-06-30 23:15:53'),
(26, 'Vishesh', '7709539466', 'o', 22, '2019-07-01', 20, '2019-06-30 23:35:47'),
(27, 'Deepesh Nair', '9923069194', 'f', 23, '2019-07-02', 14, '2019-07-01 00:43:07'),
(28, 'Kumar Rajpurohit', '8983326909', 'o', 21, '2019-07-18', 15, '2019-07-02 11:50:02'),
(29, 'Abc', '7276287701', 'm', 6, '2019-07-31', 19, '2019-07-03 15:09:48'),
(30, 'XYZ ABC', '8855021207', 'o', 23, '2019-07-08', 11, '2019-07-05 15:56:58'),
(31, 'sachin', '7972761594', 'm', 23, '2019-07-13', 14, '2019-07-06 15:15:10'),
(32, 'sachin', '7972761594', 'o', 72, '2019-07-18', 10, '2019-07-07 23:45:33');

-- --------------------------------------------------------

--
-- Table structure for table `Contact_OTP`
--

CREATE TABLE `Contact_OTP` (
  `phone` varchar(10) NOT NULL,
  `OTP` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Contact_OTP`
--

INSERT INTO `Contact_OTP` (`phone`, `OTP`, `id`, `timestamp`) VALUES
('9923069194', 328782, 47, '2019-06-23 17:40:51'),
('9860465866', 130304, 49, '2019-06-29 12:54:24'),
('7709539466', 208456, 83, '2019-06-29 16:35:26'),
('3333333333', 771094, 111, '2019-06-29 22:07:43'),
('7972761594', 48915, 114, '2019-06-29 22:38:28'),
('0000000000', 463634, 119, '2019-06-29 23:11:12'),
('7777777777', 930370, 120, '2019-06-29 23:13:59'),
('9999999999', 354625, 121, '2019-06-29 23:15:17'),
('7972751594', 466668, 124, '2019-06-29 23:20:34'),
('7972751694', 855624, 125, '2019-06-29 23:21:49'),
('8983326909', 949974, 136, '2019-07-02 11:49:36'),
('7276287701', 182520, 137, '2019-07-03 15:09:08'),
('8855021207', 104361, 138, '2019-07-05 15:56:19'),
('', 157657, 140, '2019-07-06 11:46:13'),
('1234567890', 867525, 198, '2019-07-11 19:51:03');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` int(100) NOT NULL,
  `message` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Contact_OTP`
--
ALTER TABLE `Contact_OTP`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Contact_OTP`
--
ALTER TABLE `Contact_OTP`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
