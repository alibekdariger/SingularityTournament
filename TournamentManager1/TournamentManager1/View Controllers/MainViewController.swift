//
//  MainViewController.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit

class MainViewController: UIViewController {
    

    
    var safeArea: UILayoutGuide!
    
    @IBOutlet var tableView: UITableView!
    
    private let networkManager: NetworkManagerAF = .shared
    
    var tournaments: [TournamentDetails] = []
    {
        didSet {
            tableView.reloadData()
        }
    }

    static var identifier = "ViewController"

    override func viewDidLoad() {
        super.viewDidLoad()
        
        safeArea = view.layoutMarginsGuide
    
        tableView.delegate = self
        tableView.dataSource = self
        title = "Tournaments"
        
        setUpNaviagtion()
        loadTournaments()
        
    }
    

    
    func setUpNaviagtion() {
        navigationItem.title = "Tournaments"
        
        self.navigationController?.view.backgroundColor = .white
        self.navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.black]
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarMetrics.default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(handleAddContact))
    }

    // MARK: - Selectors

    @objc func handleAddContact () {
        let controller = AddTournamentViewController()
        controller.addDelegate = self
        navigationController?.pushViewController(controller, animated: true)

    }
}

extension MainViewController: UITableViewDelegate, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return tournaments.count

    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TournamentTableViewCell") as! TournamentTableViewCell
        
        cell.configure(with: tournaments[indexPath.row])
        
        return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let vc = storyboard?.instantiateViewController(withIdentifier: "DetailViewController") as! DetailViewController
        vc.tournament = tournaments[indexPath.row]
        vc.tournamentId = tournaments[indexPath.row].id
        self.navigationController?.pushViewController(vc, animated: true)
    }
}


extension MainViewController:  AddTournamentDelegate {

    func addTournament(tournament: TournamentDetails) {
        self.dismiss(animated: true) {
            self.tournaments.append(tournament)
            self.tableView.reloadData()
        }
    }
}

extension MainViewController {
    private func loadTournaments() {
         //network request
        networkManager.loadTournaments { [weak self] tournaments in
            self?.tournaments = tournaments
            self?.loadTournaments()
        }
    }
}

