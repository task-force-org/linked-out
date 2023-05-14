-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- -----------------------------------------------------
-- -----------------------------------------------------
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`company` (
  `idcompany` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `img` TEXT NOT NULL,
  PRIMARY KEY (`idcompany`))
ENGINE = InnoDB;

  
-- -----------------------------------------------------
-- Table `mydb`.`posts-company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`posts-company` (
  `idposts-company` INT NOT NULL AUTO_INCREMENT,
  `post_title` VARCHAR(45) NOT NULL,
  `post_img` VARCHAR(500) NOT NULL,
  `post_description` TEXT NOT NULL,
  `post_date` VARCHAR(45) NOT NULL,
  `post_aplliers` INT NOT NULL,
  `company_idcompany` INT NOT NULL,
  `posts_details` TEXT NOT NULL,
  PRIMARY KEY (`idposts-company`, `company_idcompany`),
  INDEX `fk_posts-company_company_idx` (`company_idcompany` ASC) VISIBLE,
  CONSTRAINT `fk_posts-company_company`
    FOREIGN KEY (`company_idcompany`)
    REFERENCES `mydb`.`company` (`idcompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`individual`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`individual` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `bio` TEXT NOT NULL,
  `experiences` TEXT NOT NULL,
  `education` TEXT NOT NULL,
  `profile_pic` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`posts-users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`posts-users` (
  `idposts-users` INT NOT NULL AUTO_INCREMENT,
  `post_title` VARCHAR(45) NOT NULL,
  `post_img` VARCHAR(500) NOT NULL,
  `post_description` TEXT NOT NULL,
  `post_date` VARCHAR(45) NOT NULL,
  `post_aplliers` INT NOT NULL,
  `individual_userID` INT NOT NULL,
  `post_details` TEXT NOT NULL,
  PRIMARY KEY (`idposts-users`, `individual_userID`),
  INDEX `fk_posts-users_individual1_idx` (`individual_userID` ASC) VISIBLE,
  CONSTRAINT `fk_posts-users_individual1`
    FOREIGN KEY (`individual_userID`)
    REFERENCES `mydb`.`individual` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`applied_users_tab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`applied_users_tab` (
  `posts-company_idposts-company` INT NOT NULL,
  `posts-company_company_idcompany` INT NOT NULL,
  `individual_userID` INT NOT NULL,
  PRIMARY KEY (`posts-company_idposts-company`, `posts-company_company_idcompany`, `individual_userID`),
  INDEX `fk_posts-company_has_individual_individual1_idx` (`individual_userID` ASC) VISIBLE,
  INDEX `fk_posts-company_has_individual_posts-company1_idx` (`posts-company_idposts-company` ASC, `posts-company_company_idcompany` ASC) VISIBLE,
  CONSTRAINT `fk_posts-company_has_individual_posts-company1`
    FOREIGN KEY (`posts-company_idposts-company` , `posts-company_company_idcompany`)
    REFERENCES `mydb`.`posts-company` (`idposts-company` , `company_idcompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_posts-company_has_individual_individual1`
    FOREIGN KEY (`individual_userID`)
    REFERENCES `mydb`.`individual` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`applied_companies_tab`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`applied_companies_tab` (
  `company_idcompany` INT NOT NULL,
  `posts-users_idposts-users` INT NOT NULL,
  `posts-users_individual_userID` INT NOT NULL,
  PRIMARY KEY (`company_idcompany`, `posts-users_idposts-users`, `posts-users_individual_userID`),
  INDEX `fk_company_has_posts-users_posts-users1_idx` (`posts-users_idposts-users` ASC, `posts-users_individual_userID` ASC) VISIBLE,
  INDEX `fk_company_has_posts-users_company1_idx` (`company_idcompany` ASC) VISIBLE,
  CONSTRAINT `fk_company_has_posts-users_company1`
    FOREIGN KEY (`company_idcompany`)
    REFERENCES `mydb`.`company` (`idcompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_company_has_posts-users_posts-users1`
    FOREIGN KEY (`posts-users_idposts-users` , `posts-users_individual_userID`)
    REFERENCES `mydb`.`posts-users` (`idposts-users` , `individual_userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

ALTER TABLE `mydb`.`applied_users_tab`
DROP FOREIGN KEY `fk_posts-company_has_individual_posts-company1`;

ALTER TABLE `mydb`.`applied_users_tab`
ADD CONSTRAINT `fk_posts-company_has_individual_posts-company1`
    FOREIGN KEY (`posts-company_idposts-company`, `posts-company_company_idcompany`)
    REFERENCES `posts-company` (`idposts-company`, `company_idcompany`)
    ON DELETE CASCADE;

INSERT INTO `company` (`company_name`, `description`, `email`, `password`, `img`) VALUES
('ABC Company', 'We are a software development company based in California.', 'abc@example.com', 'password123', 'https://www.abcwebservice.com/wp-content/uploads/2018/04/Logo-2.jpg'),
('XYZ Inc.', 'We provide IT consulting services for businesses.', 'xyz@example.com', 'password456', 'https://www.mmaglobal.com/files/styles/member_logo_large/public/logos/xyzcorporatepro.png?itok=ehOUsiQj'),
('Acme Corporation', 'We manufacture and distribute products worldwide.', 'acme@example.com', 'password789', 'https://media.dayoftheshirt.com/images/shirts/YNEtF/teepublic_acme-corporation-alt-print-teepublic_1679596183.large.png'),
('Global Enterprises', 'We offer logistics and supply chain management services.', 'global@example.com', 'password123', 'https://globalent.in/wp-content/uploads/2023/02/2-1.png'),

('Infinity Technologies', 'We develop cutting-edge software solutions for our clients.', 'infinity@example.com', 'password789', 'https://media.licdn.com/dms/image/C4D0BAQGV8yC5Q4DGjA/company-logo_200_200/0/1604125489283?e=2147483647&v=beta&t=Mjk7uw_S9ZL8L1nwnTAy1JVK-u48002NmKR0pfHeIY0')



INSERT INTO `mydb`.`posts-company` (`post_title`, `post_img`, `post_description`, `post_date`, `post_aplliers`, `company_idcompany`, `posts_details`) 
VALUES 
('Job Opening for Software Engineer', 'https://img.freepik.com/premium-vector/we-are-hiring-software-developers-join-our-team-banner-design_116137-2599.jpg', 'We are looking for a software engineer to join our team...', '2022-05-01', 10, 1, 'The ideal candidate should have at least 5 years of experience...'),
('Marketing Manager Position Available', 'https://i.pinimg.com/736x/6b/5d/a8/6b5da8426ad2723ce8cacd9a6eeb7b9c--digital-marketing-manager.jpg', 'We are looking for a marketing manager to lead our marketing efforts...', '2022-05-02', 5, 2, 'The successful candidate will be responsible for developing and executing our marketing strategy...'),
('UI/UX Designer Wanted', 'https://cdn.dribbble.com/users/412187/screenshots/2580011/media/25ccd21ca3252cc6cbbd0966c8bd77bf.png?compress=1&resize=400x300&vertical=top', 'We are looking for a talented UI/UX designer to join our team...', '2022-05-03', 8, 3, 'The ideal candidate should have experience with user research, wireframing, prototyping, and visual design...'),
('Product Manager Needed', 'https://s40424.pcdn.co/in/wp-content/uploads/2022/11/03-Framework_DIGS_shutterstock_524765743-scaled.jpg.optimal.jpg', 'We are seeking a product manager to lead our product development efforts...', '2022-05-04', 6, 4, 'The successful candidate will be responsible for developing our product roadmap and leading cross-functional teams...'),
('Front-end Developer Position Available', 'https://static1.shine.com/l/m/images/blog/Front-End-Developer-Jobs.jpg', 'We are looking for a front-end developer to join our team...', '2022-05-05', 3, 5, 'The ideal candidate should have experience with HTML, CSS, JavaScript, and React...'),
('Customer Support Specialist Wanted', 'https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/925689844BusinessDevelopmentSpecialist.jpg', 'We are looking for a customer support specialist to provide excellent service to our customers...', '2022-05-06', 12, 1, 'The successful candidate will be responsible for handling customer inquiries, troubleshooting issues, and resolving complaints...'),
('Data Scientist Needed', 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20201204214058/Why-Do-We-Need-Data-Science.png', 'We are seeking a data scientist to help us analyze and interpret our data...', '2022-05-07', 4, 2, 'The ideal candidate should have experience with statistical analysis, machine learning, and data visualization...'),
('Backend Developer Position Available', 'https://kinsta.com/wp-content/uploads/2021/11/Untitled-50.png', 'We are looking for a backend developer to join our team...', '2022-05-08', 7, 1, 'The ideal candidate should have experience with Python, SQL, and RESTful APIs...'),
('Sales Representative Wanted', 'https://compassplastics.com/wp-content/uploads/2017/05/sales.jpg', 'We are looking for a sales representative to help us grow our business...', '2022-05-09', 9, 5, 'The successful candidate will be responsible for generating leads, closing deals, and building relationships with customers...'),
('HR Manager Position Available', 'https://d341ezm4iqaae0.cloudfront.net/assets/2019/05/20231403/HR_Duties01.jpg', 'We are looking for an HR manager to oversee our HR operations...', '2022-05-10', 2, 4, 'The successful candidate will be responsible for recruiting, training, and managing our staff...') ;


