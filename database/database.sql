-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ekki
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ekki
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ekki` DEFAULT CHARACTER SET utf8 ;
USE `ekki` ;

-- -----------------------------------------------------
-- Table `ekki`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ekki`.`users` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updateAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ekki`.`user_accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ekki`.`user_accounts` (
  `id_account` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `balance_value` DECIMAL(16,2) NOT NULL DEFAULT '0.00',
  `limit_value` DECIMAL(16,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_account`),
  INDEX `id_user_idx` (`id_user` ASC),
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `ekki`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ekki`.`account_operation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ekki`.`account_operation` (
  `id_account_operation` INT(11) NOT NULL AUTO_INCREMENT,
  `id_account_from` INT(11) NOT NULL,
  `id_account_to` INT(11) NOT NULL,
  `value` DECIMAL(16,2) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id_account_operation`),
  INDEX `id_account_from_idx` (`id_account_from` ASC),
  INDEX `id_account_to_idx` (`id_account_to` ASC),
  CONSTRAINT `id_account_from`
    FOREIGN KEY (`id_account_from`)
    REFERENCES `ekki`.`user_accounts` (`id_account`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_account_to`
    FOREIGN KEY (`id_account_to`)
    REFERENCES `ekki`.`user_accounts` (`id_account`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ekki`.`user_contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ekki`.`user_contacts` (
  `id_user` INT(11) NOT NULL,
  `id_user_contact` INT(11) NOT NULL,
  INDEX `id_user_c_idx` (`id_user` ASC),
  INDEX `id_user_cont_c_idx` (`id_user_contact` ASC),
  CONSTRAINT `id_user_c`
    FOREIGN KEY (`id_user`)
    REFERENCES `ekki`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_user_cont_c`
    FOREIGN KEY (`id_user_contact`)
    REFERENCES `ekki`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
