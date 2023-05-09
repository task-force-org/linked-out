-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
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
