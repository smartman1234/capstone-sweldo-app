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

    public static function validateJobTitle(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a Job Title';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateSalary(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a Salary';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateDepartment(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a Department';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateTaskName(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter your task name';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (preg_match("/[^A-Za-z0-9\s]/", $value)) {
            return 'Only letters, numbers and space are allowed';
        }
        return null;
    }

    public static function validateTimestamp(string $value = null)
    {
        if (empty($value)) {
            return 'Invalid timestamp';
        }
        if (!is_numeric($value)) {
            return 'Invalid timestamp';
        }
        return null;
    }

    public static function validateDeductionName(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a Deduction name';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateDeductionAmount(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a Deduction amount';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateDate(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a date';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (preg_match("/([012]?[1-9]|[12]0|3[01])\/(0?[1-9]|1[012])\/([0-9]{4})/", $value)) {
            return 'Please put the correct date';
        }
        return null;
    }

    public static function validateReason(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a reason';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }

    public static function validateAvatar($value = null)
    {
        // TODO: proper validation O_o
        return null;
    }
}
