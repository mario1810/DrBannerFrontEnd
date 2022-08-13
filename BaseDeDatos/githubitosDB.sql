-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Githubitos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Githubitos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Githubitos` DEFAULT CHARACTER SET utf8 ;
USE `Githubitos` ;

-- -----------------------------------------------------
-- Table `Githubitos`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `apellido` VARCHAR(100) NULL,
  `correo` VARCHAR(150) NULL,
  `password` VARCHAR(150) NULL,
  `telefono` VARCHAR(105) NULL,
  `avatar` VARCHAR(1000) NULL,
  `numero_tarjeta` VARCHAR(16) NULL,
  `tipo_tarjeta` VARCHAR(20) NULL,
  `rol_id_rol` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_Usuarios_Rol1_idx` (`rol_id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_Rol1`
    FOREIGN KEY (`rol_id_rol`)
    REFERENCES `Githubitos`.`rol` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`compra` (
  `id_compra` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `fecha_compra` DATE NULL,
  `hora_compra` TIME NULL,
  `comprado` TINYINT NULL,
  `costo_total` DECIMAL(2) NULL,
  PRIMARY KEY (`id_compra`),
  INDEX `fk_pedido_Usuarios_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_Usuarios`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Githubitos`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre_categoria` VARCHAR(45) NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`paquetes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`paquetes` (
  `id_paquetes` INT NOT NULL AUTO_INCREMENT,
  `categoria_id_categoria` INT NOT NULL,
  `nombre_paquete` VARCHAR(45) NOT NULL,
  `costo` DECIMAL(2) NULL,
  PRIMARY KEY (`id_paquetes`),
  INDEX `fk_Paquetes_Categoria1_idx` (`categoria_id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_Paquetes_Categoria1`
    FOREIGN KEY (`categoria_id_categoria`)
    REFERENCES `Githubitos`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`caracteristicasPaquete`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`caracteristicasPaquete` (
  `paquetes_id_paquetes` INT NOT NULL,
  `cambios_ropa` VARCHAR(45) NULL,
  `fotos_digital` INT NULL,
  `fotos_impresas` INT NULL,
  `caballete` TINYINT NULL,
  `cuadro` INT NULL,
  `caja_madera` TINYINT NULL,
  `video_3` TINYINT NULL,
  `video_10` TINYINT NULL,
  PRIMARY KEY (`paquetes_id_paquetes`),
  INDEX `fk_CaracteristicasPaquete_Paquetes1_idx` (`paquetes_id_paquetes` ASC) VISIBLE,
  CONSTRAINT `fk_CaracteristicasPaquete_Paquetes1`
    FOREIGN KEY (`paquetes_id_paquetes`)
    REFERENCES `Githubitos`.`paquetes` (`id_paquetes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`comentarios` (
  `id_comentarios` INT NOT NULL AUTO_INCREMENT,
  `comentario` VARCHAR(120) NULL,
  `fecha_comentario` DATE NULL,
  `estrellas` INT NULL,
  `usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_comentarios`),
  INDEX `fk_Comentarios_Usuarios1_idx` (`usuarios_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Comentarios_Usuarios1`
    FOREIGN KEY (`usuarios_id_usuario`)
    REFERENCES `Githubitos`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`imagenes` (
  `id_imagenes` INT NOT NULL AUTO_INCREMENT,
  `categoria_id_categoria` INT NOT NULL,
  `url` VARCHAR(500) NULL,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_imagenes`),
  INDEX `fk_Imagenes_Categoria1_idx` (`categoria_id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_Imagenes_Categoria1`
    FOREIGN KEY (`categoria_id_categoria`)
    REFERENCES `Githubitos`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Githubitos`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Githubitos`.`pedido` (
  `fecha` DATE NOT NULL,
  `direccion` VARCHAR(1000) NOT NULL,
  `compra_id_compra` INT UNSIGNED NOT NULL,
  `paquetes_id_paquetes` INT NOT NULL,
  `id_pedido` INT NOT NULL,
  INDEX `fk_Pedido_Compra1_idx` (`compra_id_compra` ASC) VISIBLE,
  INDEX `fk_Pedido_Paquetes1_idx` (`paquetes_id_paquetes` ASC) VISIBLE,
  PRIMARY KEY (`id_pedido`),
  CONSTRAINT `fk_Pedido_Compra1`
    FOREIGN KEY (`compra_id_compra`)
    REFERENCES `Githubitos`.`compra` (`id_compra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_Paquetes1`
    FOREIGN KEY (`paquetes_id_paquetes`)
    REFERENCES `Githubitos`.`paquetes` (`id_paquetes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
