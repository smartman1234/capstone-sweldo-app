<?php

namespace App\Utils;

class ValidationUtil
{
    public static function validateId(string $value = null)
    {
        if (empty($value)) {
            return 'Invalid id';
        }
        if (!is_numeric($value)) {
            return 'Invalid id';
        }
        return null;
    }

    public static function validateEmail(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter your email';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'Invalid email';
        }
        return null;
    }

    public static function validatePassword(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a password';
        }
        if (strlen($value) < 8) {
            return 'Password must be 8 characters and above';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateFirstName(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a first name';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (preg_match("/[^A-Za-z]/", $value)) {
            return 'Only letters are allowed';
        }
        return null;
    }

    public static function validateLastName(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a last name';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (preg_match("/[^A-Za-z]/", $value)) {
            return 'Only letters are allowed';
        }
        return null;
    }

    public static function validateBirthday(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a birth date';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (preg_match("/([012]?[1-9]|[12]0|3[01])\/(0?[1-9]|1[012])\/([0-9]{4})/", $value)) {
            return 'Please put the correct birth date';
        }
        return null;
    }

    public static function validateGender(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a Gender';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if ($value != 'male' && $value != 'female') {
            return 'Invalid gender';
        }
        return null;
    }

    public static function validateAddress(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter an address';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validatePhone(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a phone number';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }
}
