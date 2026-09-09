
-- phpMyAdmin SQL Dump
-- Database: assignment5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `assignment5`;
USE `assignment5`;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Table structure for table `posts`
-- --------------------------------------------------------

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Table structure for table `comments`
-- --------------------------------------------------------

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dumping data for table `users`
-- --------------------------------------------------------

INSERT INTO `users`
(`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`)
VALUES
(1, 'Mostafa', 'mostafa47@test.com', '741852', 'user',
 '2026-08-28 10:15:32', '2026-09-03 14:22:18'),

(2, 'Mostafa', 'mostafa83@gmail.com', '963214', 'user',
 '2026-08-30 16:42:11', '2026-08-30 16:42:11'),

(3, 'Mostafa', 'mostafa26@gmail.com', '528741', 'user',
 '2026-09-02 09:27:45', '2026-09-04 11:18:33'),

(4, 'Mostafa', 'mostafa91@gmail.com', '315829', 'user',
 '2026-09-05 13:08:19', '2026-09-05 13:08:19');

-- --------------------------------------------------------
-- Dumping data for table `posts`
-- --------------------------------------------------------

INSERT INTO `posts`
(`id`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `deletedAt`)
VALUES
(1, 'My First Post',
 'This is the content of my first post',
 1,
 '2026-09-01 11:20:15',
 '2026-09-02 15:35:42',
 '2026-09-02 15:35:42'),

(2, 'My New Post',
 'This is a new post',
 1,
 '2026-09-03 09:45:27',
 '2026-09-03 09:45:27',
 NULL),

(3, 'Another Post',
 'This is another post',
 1,
 '2026-09-04 14:18:36',
 '2026-09-04 14:18:36',
 NULL),

(4, 'My Fourth Post',
 'This is the fourth post',
 1,
 '2026-09-05 17:32:09',
 '2026-09-05 17:32:09',
 NULL),

(5, 'Latest Post',
 'This is my latest post',
 1,
 '2026-09-06 12:07:51',
 '2026-09-06 12:07:51',
 NULL);

-- --------------------------------------------------------
-- Dumping data for table `comments`
-- --------------------------------------------------------

INSERT INTO `comments`
(`id`, `content`, `postId`, `userId`, `createdAt`, `updatedAt`)
VALUES
(1, 'Great post!',
 1, 1,
 '2026-09-01 13:42:18',
 '2026-09-01 13:42:18'),

(2, 'Nice content',
 1, 1,
 '2026-09-02 10:16:35',
 '2026-09-02 10:16:35'),

(3, 'Very good',
 2, 1,
 '2026-09-03 11:28:44',
 '2026-09-03 11:28:44'),

(4, 'I like this post',
 3, 1,
 '2026-09-04 16:05:22',
 '2026-09-04 16:05:22');

-- --------------------------------------------------------
-- Indexes for table `users`
-- --------------------------------------------------------

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

-- --------------------------------------------------------
-- Indexes for table `posts`
-- --------------------------------------------------------

ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

-- --------------------------------------------------------
-- Indexes for table `comments`
-- --------------------------------------------------------

ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

-- --------------------------------------------------------
-- AUTO_INCREMENT for table `users`
-- --------------------------------------------------------

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=5;

-- --------------------------------------------------------
-- AUTO_INCREMENT for table `posts`
-- --------------------------------------------------------

ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=6;

-- --------------------------------------------------------
-- AUTO_INCREMENT for table `comments`
-- --------------------------------------------------------

ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT=5;

-- --------------------------------------------------------
-- Foreign Keys for table `posts`
-- --------------------------------------------------------

ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1`
  FOREIGN KEY (`userId`)
  REFERENCES `users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- --------------------------------------------------------
-- Foreign Keys for table `comments`
-- --------------------------------------------------------

ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1`
  FOREIGN KEY (`postId`)
  REFERENCES `posts` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,

  ADD CONSTRAINT `comments_ibfk_2`
  FOREIGN KEY (`userId`)
  REFERENCES `users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

COMMIT;

