//
//  SignUpViewController.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit

class SignUpViewController: UIViewController {

    private let networkManager: NetworkManagerAF = .shared
    
    @IBOutlet var loginTextField: UITextField!
    
    @IBOutlet var firstNameTextField: UITextField!
    
    @IBOutlet var lastNameTextField: UITextField!
    
    @IBOutlet var majorPickerView: UIPickerView!
    
    @IBOutlet var passwordTextField: UITextField!
    
    @IBOutlet var checkPasswordTextField: UITextField!
    
    @IBOutlet var signUpButton: UIButton!
    
    @IBOutlet var errorLabel: UILabel!
    
    private var chooseMajor: String = ""
    
    private let majors: [String] = ["Java", "Frontend", "IOS", "Android", "DevOPs"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        setUpElements()
        
        majorPickerView.delegate = self
        majorPickerView.dataSource = self
        chooseMajor = majors[0]
    }
    
    func setUpElements() {
        
        errorLabel.alpha = 0
        Utilities.styleFilledButton(signUpButton)
        majorPickerView.transform = CGAffineTransform(scaleX: 0.95, y: 0.9);
    }
    
    func validateField() -> String? {
        
        if loginTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            firstNameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            lastNameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            checkPasswordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" {
            return "Please fill in all fields."
        }
        
        let cleanedPassword = passwordTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        
        if Utilities.isPasswordValid(cleanedPassword) == false {
            return "Please make sure your passsword is at least 8 characters, contains a special character and a number."
        }
        
        if passwordTextField.text != checkPasswordTextField.text {
            return "Passwords are not the same."
        }
        
        return nil
    }
    
    @IBAction func signButtonTapped(_ sender: UIButton) {
        let error = validateField()
        
        if error != nil {
            
            showError(error!)
        } else {
            
            guard let login = loginTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
            guard let firstname = firstNameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
            guard let lastname = lastNameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
            let major = chooseMajor
            guard let password = passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }

            
            let register = PersonSignUp(login: login, name: firstname, surname: lastname, major: major, password: password)
            
            networkManager.postRegister(credentials: register) { [weak self] result in
                guard let self = self else { return }
                switch result {
                case let .success(message):
                    // some toastview to show that user is registered
                    self.transitionToHome()
                    print("123")
                case let .failure(error):
                    print("456")
                }
            }
//            Auth.auth().createUser(withEmail: email, password: password) { (result, err) in
//                // Check for errors
//                if err != nil {
//
//                    // There was an error creating the user
//                    self.showError("Error creating user")
//                }
//                else {
//
//                    // User was created successfully, now store the first name and last name
//                    let db = Firestore.firestore()
//
//                    db.collection("users").addDocument(data: ["firstname":firstName, "lastname":lastName, "uid": result!.user.uid ]) { (error) in
//
//                        if error != nil {
//                            // Show error message
//                            self.showError("Error saving user data")
//                        }
//                    }
//
                    // Transition to the home screen
                    
//                }
//            }
        }
    }
    
    func showError(_ message: String) {
        errorLabel.text = message
        errorLabel.alpha = 1
    }
    
    func transitionToHome() {
        let homeViewController = storyboard?.instantiateViewController(withIdentifier: "MainViewController") as? MainViewController
        
        self.navigationController?.pushViewController(homeViewController!, animated: true)
        
//        view.window?.rootViewController = homeViewController
        view.window?.makeKeyAndVisible()
    }
}


extension SignUpViewController: UIPickerViewDelegate, UIPickerViewDataSource {
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        majors.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        let row = majors[row]
        return row
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        chooseMajor = majors[row]
    }
}
