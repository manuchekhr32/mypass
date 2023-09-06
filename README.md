# MyPass - CLI Password Manager

MyPass is a command-line interface (CLI) password manager that helps you generate and store passwords locally for your accounts securely. Get rid of losing pain ;)

## Features

- Password Generation: MyPass allows you to generate strong, random passwords of varying lengths and complexity levels.
- Account Storage: MyPass provides a secure way to store your account information, including account name, username, and password.
- Password Retrieval: MyPass lets you retrieve your saved passwords quickly and easily without the need to remember them.

## Installation

To install MyPass, follow these simple steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/manuchekhr32/mypass.git
   ```

   Alternatively, you can download the source code directly.

2. Navigate to the project directory:

   ```bash
   cd mypass
   ```

3. Install the required dependencies using npm (Node Package Manager):

   ```bash
   npm install
   ```

4. To use better install it globally:

   ```bash
   npm i -g .
   ```

5. Run MyPass:

   ```bash
   mypass
   ```

## Usage
Once MyPass is running, you can use the following commands to interact with it:

- `generate`: Generate a new password. You can specify the length and complexity level. Use the `-l` or `--level` flag to set the complexity level (low, medium, or high). The default level is medium. Use the `-c` or `--copy` flag to copy the generated password to the clipboard automatically.
  Example: 
  ```bash
  mypass generate -l high -c
  ```

- `accounts`: View the list of saved accounts and access the main menu for managing accounts. From the account main menu, you can use the following flags to perform specific actions:
    - `-g <id>` or `--get <id>`: Get the details of a single account by providing the account ID. For example, `accounts -g 1` or `accounts -g example@gmail.com`.
    - `-e <id>` or `--edit <id>`: Edit the details of an account by providing the account ID.
    - `-d <id>` or `--delete <id>`: Delete an account by providing the account ID.
    - `-cp <id>` or `--copy-password <id>`: Copy the password of a specific account by providing the account ID.

- `create`: Create a new account. You will be prompted to enter the account name, username, and password.

Note: The MyPass CLI provides intuitive prompts to guide you through the different actions, making it easy to use even without extensive knowledge of the command-line interface.


## Security

Please be aware that the current version of MyPass **does not encrypt the account data** stored in the SQLite database. As a result, it is important to take additional precautions to secure your data, such as encrypting your entire database file or using file-level encryption on your storage device.

To enhance the security of your accounts:

- Store the MyPass database file in an encrypted disk or folder.
- Use full-disk encryption or a secure file system to protect against unauthorized access to the database file.
- Implement your own encryption methods or consider migrating to a more secure password manager solution.

Please note that ensuring the security of your data is ultimately your responsibility. The developers of MyPass do not take any responsibility for the security of your stored accounts.

## Contributing

Contributions are welcome! If you would like to contribute to MyPass, please take a look at the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

MyPass is released under the [MIT License](LICENSE).

## Disclaimer

MyPass is provided as-is without any warranty or guarantee. Use it at your own risk. The developers of MyPass are not liable for any damages or losses caused by the use of this software.

## Contact

If you have any questions or suggestions regarding MyPass, feel free to reach out to us at [manuchekhr3232@gmail.com](mailto:manuchekhr3232@gmail.com) or [@raupov_manuchehr](https://raupov_manuchehr.t.me)
